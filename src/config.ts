// 모든 사이트 사실(NAP·좌표·평점·지도 링크·외부 출처)의 단일 출처입니다.
// 영업시간·메뉴 가격·휴무·주차 요금 등 변동 정보는 현장 확인을 권장합니다.

export const SITE_NAME =
  '강릉중앙시장 (Gangneung Jungang Market) 비공식 여행 가이드';

export function withSiteName(suffix: string): string {
  return `${suffix} | ${SITE_NAME}`;
}

export const DOMAIN = 'gnjungangmarket.com';

// 강릉 중앙시장 실체 사실
export const ATTRACTION = {
  nameKo: '강릉중앙시장',
  nameEn: 'Gangneung Jungang Market',
  alternateName: '강릉 전통시장',
  category: '시장 · Street Market',
  categoryEn: 'Traditional Market',
  description:
    '강원특별자치도 강릉시 중심가에 자리한 향토 전통시장. 닭강정·어묵고로케 등 길거리 먹거리와 농수산 특산물로 알려져 있습니다.',
  address: {
    street: '강원특별자치도 강릉시 금성로 21',
    streetEn: '21 Geumseong-ro, Gangneung-si, Gangwon-do, South Korea',
    city: '강릉시',
    region: '강원특별자치도',
    country: '대한민국',
    postalCode: '25469',
  },
  geo: {
    latitude: 37.7539884,
    longitude: 128.8986105,
  },
  plusCode: 'QV3X+HC 강릉시 강원도',
  telephone: '+82 33-648-2285',
  telephoneDisplay: '+82 33-648-2285',
  rating: 4.0,
  reviewCount: 17103,
  mapsUrl: 'https://maps.app.goo.gl/81cqUJsHeewA21wy9',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=강릉중앙시장&ll=37.7539884,128.8986105&z=16&output=embed',
};

// 일반적 운영 시간(참고용). 개별 점포마다 다를 수 있으므로 현장 확인 권장.
export const HOURS = {
  daily: '평일·주말 09:00–21:00 (점포마다 상이)',
  note: '전통시장은 통상 오전부터 야간까지 운영하나, 점포별 영업시간과 휴무는 다를 수 있습니다. 방문 전 현장 또는 공식 안내를 확인하세요.',
  // JSON-LD용 대표 운영 시간(월~일 09:00-21:00)
  opens: '09:00',
  closes: '21:00',
};

// 신뢰할 수 있는 외부 출처 (footer·출처 섹션)
export const SOURCES = [
  {
    label: '강릉시 중앙시장 안내',
    url: 'https://www.gn.go.kr/www/contents.do?key=568',
    publisher: '강릉시청',
  },
  {
    label: '강릉시 교통정보·주차장 안내',
    url: 'https://its.gn.go.kr/',
    publisher: '강릉시 스마트 교통정보',
  },
  {
    label: '한국관광공사(대한민국 구석구석) 강릉 중앙시장',
    url: 'https://korean.visitkorea.or.kr/',
    publisher: '한국관광공사',
  },
  {
    label: 'Google 지도 · 강릉중앙시장',
    url: 'https://maps.app.goo.gl/81cqUJsHeewA21wy9',
    publisher: 'Google Maps',
  },
];

export const GA4_ID = 'G-HXM22WWPKP';
