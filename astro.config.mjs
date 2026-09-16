import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 확정 도메인은 이 한 곳에만 입력하세요. 예: 'https://your-domain.kr'
// 비워 두면 canonical/og:url/사이트맵은 자동으로 생략되어 빌드를 막지 않습니다.
const SITE_URL = '';
const site = SITE_URL.trim() || undefined;

export default defineConfig({
  site,
  output: 'static',
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()],
  },
});
