# 강릉 중앙시장 비공식 여행 가이드

강릉 중앙시장(강원특별자치도 강릉시 금성로 21)을 위한 한국어 단일 페이지 Astro 사이트입니다.

## 기술 스택

- Astro 7.3.2
- Tailwind CSS 4.3.3 + @tailwindcss/vite 4.3.3
- TypeScript 6.0.3 (`@astrojs/check` 0.9.10 지원 범위)
- pnpm 12.4.1
- Node.js 24.21.0
- Cloudflare Workers Static Assets + Wrangler 4.131.1
- @astrojs/sitemap 3.7.4 (site 설정 시에만 활성화)
- GA4: G-HXM22WWPKP

## 도메인 설정 — 딱 한 곳

`astro.config.mjs`의 `SITE_URL` 상수에 확정 도메인을 입력합니다.

```js
const SITE_URL = '';
```

빈 값이면 빌드는 정상 진행되며 canonical, `og:url`, 절대 OG 이미지 URL, sitemap은 생략됩니다. `example.com`, `localhost` 등의 임시 도메인으로 대체하지 않습니다.

## 로컬 실행

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

## Cloudflare Workers 배포

이 프로젝트는 정적 Astro 결과물(`dist/`)을 Cloudflare Workers로 배포합니다.

```bash
pnpm deploy
```

- `worker/index.js`가 Worker 진입점(`main`)이며, 정적 자산은 `ASSETS` 바인딩으로 제공합니다.
- `GET /api/weather` 요청은 Worker가 서버 사이드에서 기상 데이터를 받아 엣지에 캐시한 뒤 동일 출처로 응답합니다. 브라우저는 업스트림 엔드포인트나 제공처를 직접 알지 못합니다.
- `wrangler.jsonc`에 Worker 이름, `main`, `assets`(directory + binding)이 구성되어 있습니다.

## 정보 출처

- 강릉시 중앙시장 안내: https://www.gn.go.kr/www/contents.do?key=568
- 강릉시 교통정보 주차장 안내: https://its.gn.go.kr/
- 대한민국 구석구석(한국관광공사) 강릉 중앙시장 안내
- Google Maps 위치 좌표: 37.7539884, 128.8986105
- 실시간 날씨: 서버 사이드 프록시(`worker/index.js` → `/api/weather`)로 제공됩니다. 키가 필요 없는 공개 기상 데이터를 엣지 캐시하여 안정적으로 응답합니다.
- 실제 사진 출처/라이선스: `public/images/PHOTO_SOURCES.md`

시장 점포의 영업시간, 메뉴 가격, 휴무, 주차 요금/운영 상태는 변동 가능성이 있어 현장 확인을 권장합니다.
