// 전역 다국어 사전. 기본 언어는 한국어(ko), en/zh/ja 로 전환합니다.
// 모든 사용자 노출 문구는 이 파일의 단일 출처에서 가져옵니다.

export const locales = ['ko', 'en', 'zh', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ko';

export const htmlLang: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en',
  zh: 'zh-CN',
  ja: 'ja',
};

export const ogLocale: Record<Locale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
};

export const siteName: Record<Locale, string> = {
  ko: '강릉중앙시장 (Gangneung Jungang Market) 비공식 여행 가이드',
  en: 'Gangneung Jungang Market (강릉중앙시장) Travel Guide',
  zh: '江陵中央市场 (Gangneung Jungang Market) 旅游指南',
  ja: '江陵中央市場 (Gangneung Jungang Market) 旅行ガイド',
};

export function withSiteName(locale: Locale, suffix: string): string {
  return `${suffix} | ${siteName[locale]}`;
}

// 언어별 경로: 기본언어는 루트, 나머지는 /en/ /zh/ /ja/
export function localizedPath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}

// hreflang 대상 맵 (x-default 는 기본언어로)
export function hreflangMap(): Record<string, string> {
  const m: Record<string, string> = {};
  for (const l of locales) m[l] = localizedPath(l);
  m['x-default'] = localizedPath(defaultLocale);
  return m;
}

// ── 짧은 UI 문자열 (네비/버튼/섹션 타이틀/라벨 등) ──
export interface FoodItem {
  name: string;
  en: string;
  desc: string;
}
export interface FacilityItem {
  icon: string;
  name: string;
  desc: string;
}
export interface TransportCard {
  title: string;
  desc: string;
}
export interface FaqItem {
  q: string;
  a: string;
}

export const ui: Record<Locale, {
  nav: { intro: string; hours: string; food: string; transport: string; weather: string; map: string; faq: string; openMap: string };
  hero: {
    tag: string;
    sub: string;
    ctaHours: string;
    ctaMap: string;
    infoTitle: string;
    labelAddress: string;
    labelPhone: string;
    labelRating: string;
    labelHours: string;
    labelLocation: string;
  };
  hours: {
    title: string;
    lead: string;
    generalTitle: string;
    tipTitle: string;
    tips: string[];
    mapCta: string;
  };
  food: { title: string; lead: string };
  facilities: { title: string; lead: string };
  transport: { title: string; lead: string; note: string; cards: TransportCard[] };
  map: { title: string; lead: string; open: string };
  faq: { title: string; lead: string; items: FaqItem[] };
  sources: { title: string; lead: string; note: string };
  footer: {
    brandTitle: string;
    disclaimer: string;
    quickTitle: string;
    sourcesTitle: string;
    tagline: string;
    home: string;
  };
  weather: {
    title: string;
    lead: string;
    loading: string;
    note: string;
    risk: string;
    outfit: string;
    plan: string;
    items: string;
    today: string;
    plusDay: (n: number) => string;
    curFeels: string;
    curHumidity: string;
    curWind: string;
    curRain: string;
    metaRain: string;
    metaWind: string;
    metaUv: string;
    fallback: string;
  };
}> = {
  ko: {
    nav: {
      intro: '소개',
      hours: '영업시간',
      food: '먹거리',
      transport: '교통·주차',
      weather: '날씨',
      map: '지도',
      faq: 'FAQ',
      openMap: '지도 열기',
    },
    hero: {
      tag: '강원 강릉 · 전통시장',
      sub: '강릉 시내 중심가의 향토 전통시장. 달콤짭짤한 닭강정과 노상 먹거리 골목, 싱싱한 농수산 특산물로 알려진 지역 명소입니다.',
      ctaHours: '영업시간 보기',
      ctaMap: '지도 열기',
      infoTitle: '기본 정보',
      labelAddress: '주소',
      labelPhone: '전화',
      labelRating: '구글 평점',
      labelHours: '일반적 영업시간',
      labelLocation: '위치',
    },
    hours: {
      title: '영업시간',
      lead: '검색에서 가장 많이 찾는 정보입니다. 전통시장은 통상 아침부터 밤까지 운영하지만, 점포별 영업시간과 휴무는 다를 수 있습니다.',
      generalTitle: '일반적 운영 시간',
      tipTitle: '방문 팁',
      tips: [
        '먹자골목·노점은 저녁 시간대가 가장 활기롭습니다.',
        '명절 연휴에는 일부 점포가 쉴 수 있으니 미리 확인하세요.',
        '정확한 점포 영업시간은 현장 안내판을 확인하세요.',
      ],
      mapCta: '지도에서 위치 확인',
    },
    food: {
      title: '먹거리',
      lead: '강릉 중앙시장을 찾는 이유이자 하이라이트. 대표 메뉴와 시장 먹자 코너를 정리했습니다. (가격·메뉴는 점포마다 다릅니다.)',
    },
    facilities: {
      title: '시설·편의',
      lead: '시장을 편하게 둘러보기 위한 기본 편의 정보입니다.',
    },
    transport: {
      title: '교통·주차',
      lead: '강릉역 인근에 위치한 시장으로, 기차·버스·시내버스로 접근하기 좋습니다.',
      note: '정확한 노선·배차·주차 요금은 방문 시 공식 안내를 확인하세요.',
      cards: [
        {
          title: '🚆 기차 (KTX·SRT)',
          desc: '청량리(서울) 등에서 KTX·SRT로 강릉역 도착. 시장은 강릉역 인근에 있어 시내버스 또는 도보로 이동할 수 있습니다. (역에서 도보 약 10분 내외, 동선·점포에 따라 다름)',
        },
        {
          title: '🚌 고속·시외버스',
          desc: '동서울·석계 등 주요 터미널에서 강릉 종합버스터미널 행 버스 이용. 터미널에서 시내버스 환승 또는 택시로 이동합니다.',
        },
        {
          title: '🚌 시내버스·도보',
          desc: '강릉 시내를 지나는 시내버스 노선 다수가 시장 인근 정류장에 정차. 정류장 하차 후 도보로 시장 입구 도착합니다.',
        },
        {
          title: '🅿️ 주차',
          desc: '시장 인근 공영주차장과 시장 주차장을 이용합니다. 요금·만차 여부는 강릉시 스마트 교통정보(its.gn.go.kr)에서 실시간 확인하세요. 주말·연휴는 혼잡할 수 있습니다.',
        },
      ],
    },
    map: {
      title: '위치 지도',
      lead: '',
      open: 'Google 지도에서 크게 보기',
    },
    faq: {
      title: '자주 묻는 질문',
      lead: '영업시간·주차·교통 등 방문 전 자주 묻는 질문을 모았습니다.',
      items: [
        { q: '강릉중앙시장 영업시간은 언제인가요?', a: '전통시장은 통상 평일·주말 09:00–21:00 무렵까지 운영하나, 점포별 영업시간은 다릅니다. 정확한 시간은 현장 안내를 확인하세요.' },
        { q: '휴무일이 있나요?', a: '시장 전체는 대체로 매일 열리지만, 개별 점포·노점은 사정에 따라 휴무할 수 있습니다. 명절 연휴에는 일부 점포가 쉴 수 있습니다.' },
        { q: '주차는 어디에 하나요?', a: '시장 인근 공영주차장과 시장 주차장을 이용합니다. 요금과 만차 여부는 강릉시 스마트 교통정보(its.gn.go.kr)에서 실시간 확인하세요.' },
        { q: '닭강정은 어디서 먹나요?', a: '시장의 먹자골목 여러 점포에서 닭강정과 노상 간식을 판매합니다. 점포마다 양념·메뉴가 다르니 골목을 천천히 둘러보세요.' },
        { q: '대중교통으로 어떻게 가나요?', a: 'KTX·SRT 강릉역 인근에 위치하며, 시내버스 다수 노선이 시장 근처 정류장에 정차합니다. 터미널에서는 시내버스나 택시를 이용하세요.' },
        { q: '강릉역에서 얼마나 걸리나요?', a: '강릉역에서 도보로 약 10분 내외 거리로 알려져 있으나, 출발 점과 동선에 따라 달라질 수 있습니다.' },
        { q: '예약이 필요한가요?', a: '시장 자체는 예약 없이 자유롭게 방문할 수 있습니다. 단체 식사 등은 개별 식당에 문의하세요.' },
        { q: '겨울에도 운영하나요?', a: '연중 운영하는 시장이나, 한파·폭설 등 기상 상황에 따라 일부 점포가 휴무할 수 있습니다.' },
        { q: '결제는 카드가 되나요?', a: '대부분의 점포에서 카드 결제가 가능하나, 일부 노점은 현금을 선호합니다. 소액 현금을 미리 준비하면 편합니다.' },
        { q: '반려동물 동반이 가능한가요?', a: '시장 내 일반적인 반려동물 출입은 점포에 따라 다르며, 위생·안전을 위해 목줄 착용 등 에티켓을 지켜주세요.' },
      ],
    },
    sources: {
      title: '정보 출처',
      lead: '이 가이드는 아래 공공·공식 자료를 참고하여 작성한 비공식 페이지입니다.',
      note: '시장 위치·좌표·평점은 Google 지도 공개 정보(동기화 시점 2026년 9월)를 참고했습니다. 영업시간·가격 등은 현장 사정에 따라 변동될 수 있습니다.',
    },
    footer: {
      brandTitle: '강릉중앙시장',
      disclaimer: '본 사이트는 비공식 안내 페이지이며, 영업시간·가격·휴무 등은 현장 사정에 따라 바뀔 수 있습니다. 방문 전 공식 안내를 확인하세요.',
      quickTitle: '바로가기',
      sourcesTitle: '정보 출처',
      tagline: '비공식 여행 가이드 · 강릉시 향토 전통시장',
      home: '홈',
    },
    weather: {
      title: '실시간 날씨',
      lead: '강릉 중앙시장 인근의 현재 날씨와 7일 예보·방문 조언입니다. 노상 먹거리 골목 둘러보기 전에 확인하세요.',
      loading: '날씨를 불러오는 중…',
      note: '기상 정보는 동일 출처 API로 제공되며, 예보는 참고용입니다. 실제 방문 시 기상특보 등 공식 안내를 확인하세요.',
      risk: '주의',
      outfit: '옷차림',
      plan: '방문 계획',
      items: '챙길 물건',
      today: '오늘',
      plusDay: (n: number) => `+${n}일`,
      curFeels: '체감',
      curHumidity: '습도',
      curWind: '바람',
      curRain: '강수',
      metaRain: '강수',
      metaWind: '바람',
      metaUv: '자외선',
      fallback: '현재 날씨를 일시적으로 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.',
    },
  },
  en: {
    nav: {
      intro: 'Intro',
      hours: 'Hours',
      food: 'Food',
      transport: 'Transport',
      weather: 'Weather',
      map: 'Map',
      faq: 'FAQ',
      openMap: 'Open map',
    },
    hero: {
      tag: 'Gangneung, Gangwon · Traditional Market',
      sub: "A local traditional market in central Gangneung. Famous for sweet-and-savory dakgangjeong (glazed chicken) and street-food alleys, plus fresh farm and seafood specialties.",
      ctaHours: 'View hours',
      ctaMap: 'Open map',
      infoTitle: 'Quick info',
      labelAddress: 'Address',
      labelPhone: 'Phone',
      labelRating: 'Google rating',
      labelHours: 'Typical hours',
      labelLocation: 'Location',
    },
    hours: {
      title: 'Opening Hours',
      lead: 'The most-searched info. Traditional markets usually run from morning to night, but hours and closures vary by stall.',
      generalTitle: 'Typical opening hours',
      tipTitle: 'Visiting tips',
      tips: [
        'The food alley and stalls are liveliest in the evening.',
        'Some stalls may close on holidays — check ahead.',
        'Confirm exact stall hours on the on-site signage.',
      ],
      mapCta: 'Check location on map',
    },
    food: {
      title: 'Food',
      lead: 'The highlight and the reason to visit. Representative menus and the market food corner. (Prices and menus vary by stall.)',
    },
    facilities: {
      title: 'Facilities',
      lead: 'Basic conveniences for an easy stroll through the market.',
    },
    transport: {
      title: 'Transport & Parking',
      lead: 'The market sits near Gangneung Station, easy to reach by train, intercity bus, or city bus.',
      note: 'Confirm exact routes, schedules, and parking fees with official info when visiting.',
      cards: [
        {
          title: '🚆 Train (KTX·SRT)',
          desc: 'Take KTX/SRT from Cheongnyangni (Seoul) etc. to Gangneung Station. The market is near the station, reachable by city bus or on foot (about a 10-min walk, depending on your route and stalls).',
        },
        {
          title: '🚌 Express / Intercity Bus',
          desc: 'Buses from major terminals (Dongseoul, Seokgye) go to Gangneung Intercity Bus Terminal. Transfer to a city bus or taxi from there.',
        },
        {
          title: '🚌 City bus · Walking',
          desc: 'Many city-bus routes through Gangneung stop near the market. Alight and walk to the market entrance.',
        },
        {
          title: '🅿️ Parking',
          desc: 'Use public or market parking nearby. Check real-time fees and availability on Gangneung Smart Transport Info (its.gn.go.kr). Weekends and holidays can be busy.',
        },
      ],
    },
    map: {
      title: 'Location Map',
      lead: '',
      open: 'View on Google Maps',
    },
    faq: {
      title: 'Frequently Asked Questions',
      lead: 'Common questions before visiting — hours, parking, transport and more.',
      items: [
        { q: 'What are the opening hours of Gangneung Jungang Market?', a: 'Traditional markets usually run from about 09:00–21:00 on both weekdays and weekends, but stall hours vary. Check on-site for exact times.' },
        { q: 'Are there closed days?', a: 'The market as a whole is generally open daily, but individual stalls and vendors may close depending on circumstances. Some may close on holiday periods.' },
        { q: 'Where can I park?', a: 'Use nearby public or market parking. Check real-time fees and availability on Gangneung Smart Transport Info (its.gn.go.kr).' },
        { q: 'Where can I eat dakgangjeong?', a: 'Several stalls in the market food alley sell dakgangjeong and street snacks. Seasonings and menus differ by stall, so wander the alley slowly.' },
        { q: 'How do I get there by public transport?', a: 'It is near Gangneung Station (KTX/SRT); many city-bus routes stop near the market. From the terminal, take a city bus or taxi.' },
        { q: 'How far is it from Gangneung Station?', a: 'It is known to be about a 10-minute walk from Gangneung Station, though this varies by starting point and route.' },
        { q: 'Do I need a reservation?', a: 'The market itself is free to visit without reservation. For group dining, ask individual restaurants.' },
        { q: 'Is it open in winter?', a: 'It operates year-round, but some stalls may close during severe cold or heavy snow.' },
        { q: 'Do they accept cards?', a: 'Most stalls accept cards, but some vendors prefer cash. Having small cash on hand is handy.' },
        { q: 'Can I bring pets?', a: 'General pet entry varies by stall; for hygiene and safety, keep pets leashed and follow etiquette.' },
      ],
    },
    sources: {
      title: 'Sources',
      lead: 'This guide is an unofficial page written with reference to the public and official sources below.',
      note: 'Market location, coordinates, and rating refer to public Google Maps data (synced September 2026). Hours and prices may change on site.',
    },
    footer: {
      brandTitle: 'Gangneung Jungang Market',
      disclaimer: 'This is an unofficial guide; hours, prices, and closures may change on site. Check official info before visiting.',
      quickTitle: 'Quick links',
      sourcesTitle: 'Sources',
      tagline: 'Unofficial travel guide · Gangneung local traditional market',
      home: 'Home',
    },
    weather: {
      title: 'Live Weather',
      lead: 'Current conditions and a 7-day forecast with visit advice near Gangneung Jungang Market. Check before exploring the street-food alleys.',
      loading: 'Loading weather…',
      note: 'Weather is provided via a same-origin API and is for reference. Check official advisories when visiting.',
      risk: 'Caution',
      outfit: 'What to wear',
      plan: 'Visit plan',
      items: 'What to bring',
      today: 'Today',
      plusDay: (n: number) => `+${n}d`,
      curFeels: 'Feels like',
      curHumidity: 'Humidity',
      curWind: 'Wind',
      curRain: 'Rain',
      metaRain: 'Rain',
      metaWind: 'Wind',
      metaUv: 'UV',
      fallback: 'Weather is temporarily unavailable. Please check again later.',
    },
  },
  zh: {
    nav: {
      intro: '简介',
      hours: '营业时间',
      food: '美食',
      transport: '交通·停车',
      weather: '天气',
      map: '地图',
      faq: '常见问题',
      openMap: '打开地图',
    },
    hero: {
      tag: '江原 江陵 · 传统市场',
      sub: '位于江陵市中心的乡土传统市场。以甜辣的炸鸡块（닭강정）和街头小吃巷、新鲜的农水产特产而闻名。',
      ctaHours: '查看营业时间',
      ctaMap: '打开地图',
      infoTitle: '基本信息',
      labelAddress: '地址',
      labelPhone: '电话',
      labelRating: 'Google 评分',
      labelHours: '一般营业时间',
      labelLocation: '位置',
    },
    hours: {
      title: '营业时间',
      lead: '这是搜索中最常被查询的信息。传统市场通常从早开到晚，但各摊位的营业时间与休市可能不同。',
      generalTitle: '一般营业时间',
      tipTitle: '参观小贴士',
      tips: [
        '美食巷与路边摊在傍晚最为热闹。',
        '逢年过节部分摊位可能休息，建议提前确认。',
        '确切的摊位营业时间请以现场告示为准。',
      ],
      mapCta: '在地图上查看位置',
    },
    food: {
      title: '美食',
      lead: '这是到访江陵中央市场的理由与亮点。整理了代表性菜品与市场美食角。（价格与菜单因摊位而异。）',
    },
    facilities: {
      title: '设施·便利',
      lead: '方便逛市场的各项基础便利信息。',
    },
    transport: {
      title: '交通·停车',
      lead: '市场位于江陵站附近，乘火车、巴士、市内公交都很方便。',
      note: '确切的路线、班次与停车费请以访问时的官方信息为准。',
      cards: [
        {
          title: '🚆 火车（KTX·SRT）',
          desc: '从清凉里（首尔）等地乘 KTX/SRT 抵达江陵站。市场就在江陵站附近，可乘市内公交或步行前往（约步行 10 分钟，视路线与摊位而异）。',
        },
        {
          title: '🚌 高速·市外巴士',
          desc: '从东首尔、石溪等主要枢纽可乘巴士前往江陵综合巴士客运站，再转乘市内公交或出租车。',
        },
        {
          title: '🚌 市内公交·步行',
          desc: '多条途经江陵市区的市内公交在市场对面附近设站，下车后步行即可到达市场入口。',
        },
        {
          title: '🅿️ 停车',
          desc: '可使用附近的公共停车场与市场停车场。费用与车位情况请于江陵智能交通信息（its.gn.go.kr）实时查询。周末与节假日可能较拥挤。',
        },
      ],
    },
    map: {
      title: '位置地图',
      lead: '',
      open: '在 Google 地图上查看',
    },
    faq: {
      title: '常见问题',
      lead: '整理了访问前最常问的问题——营业时间、停车、交通等。',
      items: [
        { q: '江陵中央市场的营业时间是什么时候？', a: '传统市场通常平日为约 09:00–21:00，但各摊位营业时间不同。确切时间请以现场为准。' },
        { q: '有休市日吗？', a: '市场整体通常每天开放，但个别摊位与摊贩可能视情况休息。节假日期间部分摊位可能休息。' },
        { q: '在哪里停车？', a: '可使用附近的公共停车场与市场停车场。费用与车位请于江陵智能交通信息（its.gn.go.kr）实时查询。' },
        { q: '在哪里吃炸鸡块（닭강정）？', a: '市场美食巷内多家摊位售卖炸鸡块与街头小吃。各摊位酱料与菜单不同，建议慢慢逛巷子。' },
        { q: '如何搭乘大众交通前往？', a: '市场位于江陵站（KTX/SRT）附近，多条市内公交在市场对面设站。从客运站可乘市内公交或出租车。' },
        { q: '离江陵站多远？', a: '据称从江陵站步行约 10 分钟，但会因起点与路线而异。' },
        { q: '需要预约吗？', a: '市场本身无需预约即可自由参观。团体用餐请向个别餐厅咨询。' },
        { q: '冬季也营业吗？', a: '全年营业，但严寒或大雪等天气下部分摊位可能休息。' },
        { q: '可以刷卡吗？', a: '多数摊位可刷卡，但部分摊贩偏好现金。备些零钱较方便。' },
        { q: '可以携带宠物吗？', a: '市场内宠物进入因摊位而异，为卫生与安全请系好牵引绳并遵守礼仪。' },
      ],
    },
    sources: {
      title: '信息来源',
      lead: '本指南为参考下列公共与官方资料撰写的非官方页面。',
      note: '市场位置、坐标与评分参考公开的 Google 地图数据（同步于 2026 年 9 月）。营业时间与价格等可能随现场情况变动。',
    },
    footer: {
      brandTitle: '江陵中央市场',
      disclaimer: '本网站为非官方指南，营业时间、价格与休市等可能随现场情况变动。访问前请确认官方信息。',
      quickTitle: '快速链接',
      sourcesTitle: '信息来源',
      tagline: '非官方旅游指南 · 江陵市乡土传统市场',
      home: '首页',
    },
    weather: {
      title: '实时天气',
      lead: '江陵中央市场附近的当前天气、7 日预报与参观建议。逛街头美食巷前先查看。',
      loading: '正在加载天气…',
      note: '天气经同源 API 提供，仅供参考。实际访问请留意官方气象特报。',
      risk: '注意',
      outfit: '穿着建议',
      plan: '参观安排',
      items: '携带物品',
      today: '今天',
      plusDay: (n: number) => `+${n}天`,
      curFeels: '体感',
      curHumidity: '湿度',
      curWind: '风',
      curRain: '降水',
      metaRain: '降水',
      metaWind: '风',
      metaUv: '紫外线',
      fallback: '暂时无法获取天气，请稍后再试。',
    },
  },
  ja: {
    nav: {
      intro: '概要',
      hours: '営業時間',
      food: '食べ物',
      transport: 'アクセス',
      weather: '天気',
      map: '地図',
      faq: 'FAQ',
      openMap: '地図を開く',
    },
    hero: {
      tag: '江原 江陵 · 伝統市場',
      sub: '江陵市中心部の郷土伝統市場。甘じょっぱいダクガンジョン（から揚げのタレ絡め）や屋台グルメ通り、新鮮な農水産特産品で知られています。',
      ctaHours: '営業時間を見る',
      ctaMap: '地図を開く',
      infoTitle: '基本情報',
      labelAddress: '住所',
      labelPhone: '電話',
      labelRating: 'Google 評価',
      labelHours: '一般的な営業時間',
      labelLocation: '場所',
    },
    hours: {
      title: '営業時間',
      lead: '検索で最もよく調べられる情報です。伝統市場は通常朝から夜まで営業しますが、店ごとの時間や休みは異なります。',
      generalTitle: '一般的な営業時間',
      tipTitle: '訪問のヒント',
      tips: [
        '屋台通りは夕方が一番にぎやかです。',
        '連休などは一部の店が休むことがあるので事前確認を。',
        '正確な営業時間は現地の案内板で確認してください。',
      ],
      mapCta: '地図で場所を確認',
    },
    food: {
      title: '食べ物',
      lead: '訪れる理由であり一番の見どころ。代表的なメニューと市場の食べ物コーナーをまとめました。（価格・メニューは店により異なります。）',
    },
    facilities: {
      title: '施設・便利',
      lead: '市場を楽に回るための基本的な便利情報です。',
    },
    transport: {
      title: 'アクセス・駐車',
      lead: '江陵駅近くにあり、電車・バス・市内バスでアクセスしやすいです。',
      note: '正確な路線・本数・駐車料金は訪問時に公式案内でご確認ください。',
      cards: [
        {
          title: '🚆 電車（KTX・SRT）',
          desc: '清涼里（ソウル）などから KTX/SRT で江陵駅へ。市場は江陵駅近くで、市内バスか徒歩で移動できます（駅から徒歩約10分、ルートや店により異なります）。',
        },
        {
          title: '🚌 高速・市外バス',
          desc: '東ソウル・石渓など主要ターミナルから江陵総合バスターミナル行きバスを利用。ターミナルから市内バス乗り継ぎかタクシーで移動します。',
        },
        {
          title: '🚌 市内バス・徒歩',
          desc: '江陵市内を走る多くの市内バス路線が市場近くに停まります。降車後、徒歩で市場入口へ。',
        },
        {
          title: '🅿️ 駐車',
          desc: '近くの公共駐車場や市場駐車場を利用します。料金と空き状況は江陵スマート交通情報（its.gn.go.kr）でリアルタイム確認を。週末や連休は混むことがあります。',
        },
      ],
    },
    map: {
      title: '場所の地図',
      lead: '',
      open: 'Google マップで大きく見る',
    },
    faq: {
      title: 'よくある質問',
      lead: '訪問前によくある質問（営業時間・駐車・アクセスなど）をまとめました。',
      items: [
        { q: '江陵中央市場の営業時間は？', a: '伝統市場は通常、平日・週末とも約09:00–21:00まで営業しますが、店ごとの時間は異なります。正確な時間は現地で確認してください。' },
        { q: '休みの日はありますか？', a: '市場全体は基本的に毎日開いていますが、個別の店や屋台は事情により休むことがあります。連休には一部が休む場合があります。' },
        { q: '駐車場はどこですか？', a: '近くの公共駐車場や市場駐車場を利用します。料金と空きは江陵スマート交通情報（its.gn.go.kr）でリアルタイム確認を。' },
        { q: 'ダクガンジョンはどこで食べられますか？', a: '市場の屋台通りの複数店でダクガンジョンや屋台スナックを販売しています。店によりタレ・メニューが異なるのでゆっくり回ってください。' },
        { q: '公共交通でどう行きますか？', a: '江陵駅（KTX/SRT）近くにあり、多くの市内バス路線が市場近くに停まります。ターミナルからは市内バスかタクシーを利用してください。' },
        { q: '江陵駅からどのくらいですか？', a: '江陵駅から徒歩約10分程度とされますが、出発点やルートにより異なります。' },
        { q: '予約は必要ですか？', a: '市場自体は予約不要で自由に見学できます。団体食事などは各店舗へお問い合わせください。' },
        { q: '冬も営業していますか？', a: '年中営業ですが、厳しい寒さや大雪などの天候で一部の店が休むことがあります。' },
        { q: 'カードは使えますか？', a: 'ほとんどの店でカード可ですが、一部の屋台は現金を好むため、少額の現金があると便利です。' },
        { q: 'ペット同伴は可能ですか？', a: '市場内のペット同伴は店により異なります。衛生・安全のためリードをつけるなどマナーを守ってください。' },
      ],
    },
    sources: {
      title: '情報源',
      lead: 'このガイドは以下の公的・公式資料を参考にした非公式のページです。',
      note: '市場の場所・座標・評価は公開された Google マップ データ（2026年9月同期）を参考にしています。営業時間や価格は現地で変動することがあります。',
    },
    footer: {
      brandTitle: '江陵中央市場',
      disclaimer: '本サイトは非公式ガイドです。営業時間・価格・休みは現地の事情で変わることがあります。訪問前に公式案内をご確認ください。',
      quickTitle: 'リンク',
      sourcesTitle: '情報源',
      tagline: '非公式旅行ガイド · 江陵市郷土伝統市場',
      home: 'ホーム',
    },
    weather: {
      title: '天気（リアルタイム）',
      lead: '江陵中央市場周辺の現在の天気と7日予報・訪問アドバイス。屋台グルメ通りを回る前に確認を。',
      loading: '天気を読み込み中…',
      note: '天気は同一オリジンのAPIから提供され、参考用です。訪問時は公式の気象情報をご確認ください。',
      risk: '注意',
      outfit: '服装',
      plan: '訪問プラン',
      items: '持ち物',
      today: '今日',
      plusDay: (n: number) => `+${n}日`,
      curFeels: '体感',
      curHumidity: '湿度',
      curWind: '風',
      curRain: '降水',
      metaRain: '降水',
      metaWind: '風',
      metaUv: '紫外線',
      fallback: '天気を一時的に取得できませんでした。後ほど再度お試しください。',
    },
  },
};

// 언어별 콘텐츠 배열 (음식/시설)
export const FOODS: Record<Locale, FoodItem[]> = {
  ko: [
    { name: '닭강정', en: 'Dakgangjeong', desc: '강릉 중앙시장을 대표하는 메뉴. 바삭한 닭튀김에 달콤짭짤한 양념을 버무린 길거리 간식으로, 먹자골목 여러 점포에서 만날 수 있습니다.' },
    { name: '어묵고로케', en: 'Odeng Croquette', desc: '어묵이 들어간 고소한 고로케. 시장 산책 중 가볍게 즐기기 좋은 따뜻한 간식입니다.' },
    { name: '호떡·붕어빵', en: 'Hotteok · Bungeoppang', desc: '겨울철 노점에서 자주 볼 수 있는 전통 디저트. 갓 구운 따뜻한 간식이 인기입니다.' },
    { name: '떡볶이·순대·칼국수', en: 'Tteokbokki · Sundae · Kalguksu', desc: '시장 식당가와 포장마차에서 즐기는 서민 음식. 눈치 볼 것 없이 혼자서도 들르기 좋은 메뉴들입니다.' },
    { name: '농수산 특산물', en: 'Local Produce & Seafood', desc: '강릉 인근 산물과 동해 산 seafood, 곤달비·오징어 등 지역 특산물을 살 수 있는 코너가 있습니다.' },
  ],
  en: [
    { name: 'Dakgangjeong', en: 'Dakgangjeong', desc: "The market's signature: crispy fried chicken tossed in a sweet-and-savory glaze, sold at several stalls in the food alley." },
    { name: 'Odeng Croquette', en: 'Odeng Croquette', desc: 'A savory croquette with fish cake inside — a warm, light snack perfect while strolling the market.' },
    { name: 'Hotteok · Bungeoppang', en: 'Hotteok · Bungeoppang', desc: 'Traditional winter street desserts; freshly made warm snacks are popular at roadside stalls.' },
    { name: 'Tteokbokki · Sundae · Kalguksu', en: 'Tteokbokki · Sundae · Kalguksu', desc: 'Everyday Korean comfort food found in market eateries and pojangmacha tents — easy to enjoy solo, no fuss.' },
    { name: 'Local Produce & Seafood', en: 'Local Produce & Seafood', desc: 'A corner selling local Gangneung produce and East Sea seafood — gwondalbi (ferns), squid, and other regional specialties.' },
  ],
  zh: [
    { name: '炸鸡块', en: 'Dakgangjeong', desc: '市场的代表美食。酥脆炸鸡裹上甜辣酱汁的街头小吃，美食巷内多家摊位都有售。' },
    { name: '鱼糕可乐饼', en: 'Odeng Croquette', desc: '内含鱼糕的香浓可乐饼，是逛市场时轻松享用的温热小吃。' },
    { name: '核桃糕·鲤鱼饼', en: 'Hotteok · Bungeoppang', desc: '冬季路边摊常见传统甜点，刚出炉的温热小吃很受欢迎。' },
    { name: '炒年糕·血肠·刀削面', en: 'Tteokbokki · Sundae · Kalguksu', desc: '市场餐馆与摊棚里的大众美食，一个人也能轻松光顾。' },
    { name: '农水产特产', en: 'Local Produce & Seafood', desc: '设有售卖江陵附近农产与东海海鲜的角落，如蕨菜、鱿鱼等地方特产。' },
  ],
  ja: [
    { name: 'ダクガンジョン', en: 'Dakgangjeong', desc: '市場の代名詞。サクッとしたから揚げに甘じょっぱいタレを絡めた屋台スナックで、屋台通りの複数店で販売。' },
    { name: 'オデンコロッケ', en: 'Odeng Croquette', desc: '中に魚糕（おでん）入りの香ばしいコロッケ。市場散策中にぴったりの温かい軽食。' },
    { name: 'ホットク・ボグンパン', en: 'Hotteok · Bungeoppang', desc: '冬の屋台でよく見る伝統スイーツ。焼きたての温かいお菓子が人気。' },
    { name: 'トッポギ・スンデ・カルグクス', en: 'Tteokbokki · Sundae · Kalguksu', desc: '市場の食堂やポジャンマチャ（屋台）で楽しむ庶民料理。一人でも気軽に立ち寄れます。' },
    { name: '農水産特産品', en: 'Local Produce & Seafood', desc: '江陵近郊の農産物や日本海の魚介、ゴンドゥル（蕨）やイカなど地方特産品を扱うコーナーがあります。' },
  ],
};

export const FACILITIES: Record<Locale, FacilityItem[]> = {
  ko: [
    { icon: '🅿️', name: '주차', desc: '인근 공영·시장 주차장 이용. 요금과 운영 상태는 강릉시 교통정보(its.gn.go.kr)를 확인하세요.' },
    { icon: '🚻', name: '화장실', desc: '시장 내·외부 공중화장실 이용 가능.' },
    { icon: '🍢', name: '먹자골목', desc: '닭강정·노점 간식이 모여 있는 핵심 동선.' },
    { icon: '🛒', name: '특산물 코너', desc: '농수산·가공 특산물을 파는 점포들이 모여 있습니다.' },
    { icon: '💳', name: '결제', desc: '대부분 카드 결제 가능. 일부 노점은 현금을 선호하니 소액 현금을 준비하면 좋습니다.' },
    { icon: '♿', name: '이동 편의', desc: '평지 형태의 시장으로 휠체어·유모차 이동이 비교적 수월합니다.' },
  ],
  en: [
    { icon: '🅿️', name: 'Parking', desc: 'Use nearby public or market parking. Check fees and status on Gangneung transport info (its.gn.go.kr).' },
    { icon: '🚻', name: 'Restrooms', desc: 'Public restrooms available inside and around the market.' },
    { icon: '🍢', name: 'Food alley', desc: 'The core route where dakgangjeong and street snacks gather.' },
    { icon: '🛒', name: 'Specialty corner', desc: 'Stores selling farm, seafood, and processed local specialties.' },
    { icon: '💳', name: 'Payment', desc: 'Most stalls accept cards; some vendors prefer cash, so small cash helps.' },
    { icon: '♿', name: 'Mobility', desc: 'The market is flat, so wheelchairs and strollers move relatively easily.' },
  ],
  zh: [
    { icon: '🅿️', name: '停车', desc: '可使用附近的公共或市场停车场。费用与状态请于江陵交通信息（its.gn.go.kr）查询。' },
    { icon: '🚻', name: '洗手间', desc: '市场内外均设有公共洗手间。' },
    { icon: '🍢', name: '美食巷', desc: '炸鸡块与路边摊小吃汇集的主要动线。' },
    { icon: '🛒', name: '特产角', desc: '聚集贩卖农水产与加工特产的店铺。' },
    { icon: '💳', name: '支付', desc: '多数摊位可刷卡；部分摊贩偏好现金，备些零钱较方便。' },
    { icon: '♿', name: '行动便利', desc: '市场为平地，轮椅与婴儿车移动相对容易。' },
  ],
  ja: [
    { icon: '🅿️', name: '駐車場', desc: '近くの公共駐車場や市場駐車場を利用。料金と状況は江陵交通情報（its.gn.go.kr）で。' },
    { icon: '🚻', name: 'トイレ', desc: '市場内・外に公共トイレがあります。' },
    { icon: '🍢', name: '屋台通り', desc: 'ダクガンジョンや屋台スナックが集まる主要動線。' },
    { icon: '🛒', name: '特産品コーナー', desc: '農水産・加工特産品を扱う店が集まっています。' },
    { icon: '💳', name: '決済', desc: 'ほとんどの店でカード可。一部屋台は現金を好むため少額現金があると便利。' },
    { icon: '♿', name: '移動', desc: '市場は平坦なので車いすやベビーカーも比較的動きやすいです。' },
  ],
};

// 언어별 메타 설명 (TDK 기본값)
export const META_DESC: Record<Locale, string> = {
  ko: '강릉 중앙시장(강원특별자치도 강릉시 금성로 21) 비공식 여행 가이드. 영업시간·먹거리(닭강정)·주차·대중교통·실시간 날씨를 한눈에 안내합니다.',
  en: 'Gangneung Jungang Market (Gangneung, Gangwon) unofficial travel guide — hours, food (dakgangjeong), parking, transport, and live weather at a glance.',
  zh: '江陵中央市场（江原 江陵）非官方旅游指南：营业时间、美食（炸鸡块）、停车、交通与实时天气一目了然。',
  ja: '江陵中央市場（江原 江陵）非公式旅行ガイド。営業時間・食べ物（ダクガンジョン）・駐車・アクセス・天気をまとめて案内。',
};

// 기본 영업시간 문구는 언어별로 표기만 다르게 (사실은 config.HOURS)
export const HOURS_DAILY: Record<Locale, string> = {
  ko: '평일·주말 09:00–21:00 (점포마다 상이)',
  en: 'Mon–Sun 09:00–21:00 (varies by stall)',
  zh: '周一至周日 09:00–21:00（因摊位而异）',
  ja: '月〜日 09:00–21:00（店により異なる）',
};
export const HOURS_NOTE: Record<Locale, string> = {
  ko: '전통시장은 통상 오전부터 야간까지 운영하나, 점포별 영업시간과 휴무는 다를 수 있습니다. 방문 전 현장 또는 공식 안내를 확인하세요.',
  en: 'Traditional markets usually run from morning to night, but stall hours and closures can vary. Check on-site or official info before visiting.',
  zh: '传统市场通常从早开到晚，但各摊位营业时间与休市可能不同。访问前请确认现场或官方信息。',
  ja: '伝統市場は通常朝から夜まで営業しますが、店ごとの時間や休みは異なります。訪問前に現地か公式案内をご確認ください。',
};
