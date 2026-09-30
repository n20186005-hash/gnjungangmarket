// 날씨 표시 전용 헬퍼. 브라우저(WeatherSection 클라이언트 스크립트)와
// 공유될 수 있도록 DOM·네트워크에 의존하지 않는 순수 함수로 작성합니다.
// 업스트림 제공처(Open-Meteo)는 코드 주석 외에 사용자 화면에 노출되지 않습니다.

export interface WeatherNow {
  weather_code: number;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
  wind_gusts_10m: number;
}

export interface WeatherDay {
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_probability_max: number;
  uv_index_max: number;
  wind_speed_10m_max: number;
}

export interface WeatherPayload {
  current: WeatherNow;
  daily: WeatherDay[];
}

// WMO 날씨 코드 → 한국어 라벨 + 이모지 아이콘
const WMO: Record<number, { label: string; icon: string }> = {
  0: { label: '맑음', icon: '☀️' },
  1: { label: '대체로 맑음', icon: '🌤️' },
  2: { label: '부분적 구름', icon: '⛅' },
  3: { label: '흐림', icon: '☁️' },
  45: { label: '안개', icon: '🌫️' },
  48: { label: '짙은 안개', icon: '🌫️' },
  51: { label: '약한 이슬비', icon: '🌦️' },
  53: { label: '이슬비', icon: '🌦️' },
  55: { label: '강한 이슬비', icon: '🌧️' },
  56: { label: '약한 어는비', icon: '🌧️' },
  57: { label: '어는비', icon: '🌧️' },
  61: { label: '약한 비', icon: '🌦️' },
  63: { label: '비', icon: '🌧️' },
  65: { label: '강한 비', icon: '🌧️' },
  66: { label: '약한 어는비', icon: '🌧️' },
  67: { label: '어는비', icon: '🌧️' },
  71: { label: '약한 눈', icon: '🌨️' },
  73: { label: '눈', icon: '🌨️' },
  75: { label: '강한 눈', icon: '❄️' },
  77: { label: '싸락눈', icon: '🌨️' },
  80: { label: '소나기', icon: '🌦️' },
  81: { label: '소나기', icon: '🌧️' },
  82: { label: '강한 소나기', icon: '⛈️' },
  85: { label: '약한 눈보라', icon: '🌨️' },
  86: { label: '눈보라', icon: '❄️' },
  95: { label: '뇌우', icon: '⛈️' },
  96: { label: '우박 동반 뇌우', icon: '⛈️' },
  99: { label: '강한 우박 뇌우', icon: '⛈️' },
};

export function wmoLabel(code: number): { label: string; icon: string } {
  return WMO[code] ?? { label: '알 수 없음', icon: '🌡️' };
}

// km/h → 보퍼트 풍력 계급
export function kmhToBeaufort(kmh: number): number {
  const t = kmh ?? 0;
  if (t < 1) return 0;
  if (t < 6) return 1;
  if (t < 12) return 2;
  if (t < 20) return 3;
  if (t < 29) return 4;
  if (t < 39) return 5;
  if (t < 50) return 6;
  if (t < 62) return 7;
  if (t < 75) return 8;
  if (t < 89) return 9;
  if (t < 103) return 10;
  if (t < 118) return 11;
  return 12;
}

export const BEAUFORT_LABEL = [
  '고요',
  '실바람',
  '남실바람',
  '산들바람',
  '건들바람',
  '예바람',
  '센바람',
  '앞바람',
  '무더기바람',
  '큰바람',
  '황새바람',
  '노대바람',
  '광풍',
];

export function beaufortLabel(kmh: number): string {
  return BEAUFORT_LABEL[kmhToBeaufort(kmh)] ?? '';
}

export function uvLabel(uv: number): string {
  if (uv < 3) return '낮음';
  if (uv < 6) return '보통';
  if (uv < 8) return '높음';
  if (uv < 11) return '매우 높음';
  return '위험';
}

export interface Advice {
  risk: string[];
  outfit: string[];
  plan: string[];
  items: string[];
}

// 강릉은 해안가라 바람이 잦고, 겨울은 춥습니다. 시장 특성(노상 먹거리)에 맞춘
// 조건부 조언을 생성합니다. 조건을 만족하는 항목만 배열에 들어가 렌더링됩니다.
export function buildAdvice(w: WeatherPayload | null): Advice {
  const advice: Advice = { risk: [], outfit: [], plan: [], items: [] };
  if (!w) return advice;

  const now = w.current;
  const today = w.daily?.[0];

  const rainNow = now.precipitation > 0.1;
  const rainProb = today?.precipitation_probability_max ?? 0;
  const beaufort = kmhToBeaufort(now.wind_speed_10m);
  const maxBeaufort = kmhToBeaufort(today?.wind_speed_10m_max ?? 0);
  const tMax = today?.temperature_2m_max ?? now.temperature_2m;
  const tMin = today?.temperature_2m_min ?? now.temperature_2m;
  const uv = today?.uv_index_max ?? 0;
  const code = now.weather_code;
  const isThunder = code >= 95;

  // 위험(적색) — 오직 날씨에서 파생, 공식 경보 위장 금지
  if (isThunder) advice.risk.push('천둥·번개가 동반되는 날씨입니다. 노상 체류를 줄이고 건물 안에서 안전을 확인하세요.');
  if (rainProb >= 70 || (code >= 65 && code <= 67)) advice.risk.push('강한 비가 예상됩니다. 미끄럼과 침수 구간을 조심하세요.');
  if (maxBeaufort >= 8) advice.risk.push('바람이 매우 강합니다. 우산 날림과 간판·비닐 위험에 유의하세요.');
  if (tMax >= 33) advice.risk.push('폭염 주의: 수분을 자주 섭취하고 그늘에서 휴식하세요.');
  if (tMin <= -10) advice.risk.push('한파 주의: 방한용품을 갖추고 동상에 유의하세요.');

  // 옷차림
  if (tMin <= 0) advice.outfit.push('영하권입니다. 패딩·장갑·모자 등 방한용품이 필요합니다.');
  else if (tMin <= 8) advice.outfit.push('아침저녁으로 쌀쌀합니다. 겉옷을 준비하세요.');
  if (tMax >= 28) advice.outfit.push('한낮은 더웁니다. 통풍 좋은 옷차림을 권합니다.');
  if (beaufort >= 6) advice.outfit.push('바람이 강해 모자·우산이 날릴 수 있으니 고정용품을 추천합니다.');

  // 방문 계획
  if (rainNow || rainProb >= 50) advice.plan.push('비 소식이 있습니다. 지붕 있는 먹거리 골목과 실내 점포 위주로 둘러보세요.');
  else advice.plan.push('날씨가 양호하면 노상 먹거리 골목과 야외 산책을 즐기기 좋은 날입니다.');
  if (uv >= 6) advice.plan.push('자외선이 강합니다. 한낮 시간대 그늘 이용을 권합니다.');
  if (tMax <= 5) advice.plan.push('매서운 추위에는 짧게 여러 차례 둘러보고 실내 휴식을 끼우세요.');

  // 챙길 물건
  if (rainNow || rainProb >= 40) advice.items.push('우산 또는 비옷');
  if (uv >= 3) advice.items.push('선크림·선글라스');
  if (beaufort >= 5) advice.items.push('바람 고정용 모자');
  if (tMax >= 25 || tMin <= 0) advice.items.push('수분(물)');
  if (tMin <= 5) advice.items.push('방한 장갑·보온병');

  return advice;
}
