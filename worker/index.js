// Cloudflare Worker for the Gangneung Jungang Market guide.
//
// Two jobs:
//   1. Serve the static Astro build from the ASSETS binding for every
//      ordinary request (pages, images, manifest, service worker, …).
//   2. Answer GET /api/weather by fetching the forecast on the server and
//      caching it at the edge. Visitors therefore never call the upstream
//      weather service directly, and repeated page views stay fast and
//      gentle on the upstream without repeating the network call.
//
// The client page only knows about the same-origin /api/weather endpoint,
// so no upstream endpoint or provider detail is ever shipped to the browser.

const MARKET = { lat: 37.7539884, lng: 128.8986105 };

function buildWeatherUrl() {
  const u = new URL('https://api.open-meteo.com/v1/forecast');
  u.searchParams.set('latitude', String(MARKET.lat));
  u.searchParams.set('longitude', String(MARKET.lng));
  u.searchParams.set(
    'current',
    'weather_code,temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,wind_gusts_10m'
  );
  u.searchParams.set(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max'
  );
  u.searchParams.set('timezone', 'Asia/Seoul');
  u.searchParams.set('forecast_days', '7');
  u.searchParams.set('wind_speed_unit', 'kmh');
  return u.toString();
}

async function handleWeather(request, ctx) {
  const apiUrl = buildWeatherUrl();
  const cache = caches.default;
  const cacheKey = new Request(apiUrl);

  let response = await cache.match(cacheKey);
  if (response) {
    const headers = new Headers(response.headers);
    headers.set('X-Weather-Cache', 'HIT');
    return new Response(response.body, { status: response.status, headers });
  }

  let upstream;
  try {
    upstream = await fetch(apiUrl, {
      // Let Cloudflare's edge also cache the upstream response for ~30 min.
      cf: { cacheTtl: 1800, cacheEverything: true },
      headers: { 'User-Agent': 'gjm-market-guide/1.0' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'weather_unavailable' }), {
      status: 502,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  if (!upstream.ok) {
    return new Response(JSON.stringify({ error: 'weather_upstream_error' }), {
      status: 502,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  const headers = new Headers(upstream.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  // Edge: serve cached for 15 min, allow revalidation up to 30 min.
  headers.set('cache-control', 'public, max-age=900, s-maxage=1800');
  headers.set('X-Weather-Cache', 'MISS');

  const out = new Response(upstream.body, { status: upstream.status, headers });
  // Store a copy without blocking the response.
  ctx.waitUntil(cache.put(cacheKey, out.clone()));
  return out;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/weather') {
      return handleWeather(request, ctx);
    }
    // Everything else is a static asset from the Astro build.
    return env.ASSETS.fetch(request);
  },
};
