// 날씨 표시 전용 헬퍼. 브라우저(WeatherSection 클라이언트 스크립트)와
// 공유될 수 있도록 DOM·네트워크에 의존하지 않는 순수 함수로 작성합니다.
// 업스트림 제공처(Open-Meteo)는 코드 주석 외에 사용자 화면에 노출되지 않습니다.
import type { Locale } from '../i18n';

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

// 이모지 아이콘(언어 공통)
const ICON: Record<number, string> = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️', 56: '🌧️', 57: '🌧️',
  61: '🌦️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️', 77: '🌨️', 80: '🌦️', 81: '🌧️',
  82: '⛈️', 85: '🌨️', 86: '❄️', 95: '⛈️', 96: '⛈️', 99: '⛈️',
};

// WMO 날씨 코드 → 라벨 (언어별)
const WMO_LABELS: Record<Locale, Record<number, string>> = {
  ko: {
    0: '맑음', 1: '대체로 맑음', 2: '부분적 구름', 3: '흐림', 45: '안개', 48: '짙은 안개',
    51: '약한 이슬비', 53: '이슬비', 55: '강한 이슬비', 56: '약한 어는비', 57: '어는비',
    61: '약한 비', 63: '비', 65: '강한 비', 66: '약한 어는비', 67: '어는비',
    71: '약한 눈', 73: '눈', 75: '강한 눈', 77: '싸락눈', 80: '소나기', 81: '소나기', 82: '강한 소나기',
    85: '약한 눈보라', 86: '눈보라', 95: '뇌우', 96: '우박 동반 뇌우', 99: '강한 우박 뇌우',
  },
  en: {
    0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Dense fog',
    51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle', 56: 'Light freezing drizzle', 57: 'Freezing drizzle',
    61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Light freezing rain', 67: 'Freezing rain',
    71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains', 80: 'Showers', 81: 'Showers', 82: 'Violent showers',
    85: 'Light snow showers', 86: 'Snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm w/ hail', 99: 'Severe thunderstorm',
  },
  zh: {
    0: '晴', 1: '大致晴朗', 2: '局部多云', 3: '阴', 45: '雾', 48: '浓雾',
    51: '小毛毛雨', 53: '毛毛雨', 55: '强毛毛雨', 56: '小冻毛毛雨', 57: '冻毛毛雨',
    61: '小雨', 63: '雨', 65: '大雨', 66: '小冻雨', 67: '冻雨',
    71: '小雪', 73: '雪', 75: '大雪', 77: '雪粒', 80: '阵雨', 81: '阵雨', 82: '强阵雨',
    85: '小阵雪', 86: '阵雪', 95: '雷阵雨', 96: '雷阵雨伴冰雹', 99: '强雷暴',
  },
  ja: {
    0: '晴れ', 1: 'おおむね晴れ', 2: '一部曇り', 3: '曇り', 45: '霧', 48: '濃霧',
    51: '弱い霧雨', 53: '霧雨', 55: '強い霧雨', 56: '弱い着氷性霧雨', 57: '着氷性霧雨',
    61: '弱い雨', 63: '雨', 65: '強い雨', 66: '弱い凍雨', 67: '凍雨',
    71: '弱い雪', 73: '雪', 75: '強い雪', 77: '雪あられ', 80: 'にわか雨', 81: 'にわか雨', 82: '激しいにわか雨',
    85: '弱い雪のにわか', 86: '雪のにわか', 95: '雷雨', 96: 'ひょうを伴う雷雨', 99: '激しい雷雨',
  },
};

export function wmoLabel(code: number, locale: Locale): { label: string; icon: string } {
  return { label: WMO_LABELS[locale]?.[code] ?? WMO_LABELS[locale]?.[0] ?? '—', icon: ICON[code] ?? '🌡️' };
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

const BEAUFORT: Record<Locale, string[]> = {
  ko: ['고요', '실바람', '남실바람', '산들바람', '건들바람', '예바람', '센바람', '앞바람', '무더기바람', '큰바람', '황새바람', '노대바람', '광풍'],
  en: ['Calm', 'Light air', 'Light breeze', 'Gentle breeze', 'Moderate breeze', 'Fresh breeze', 'Strong breeze', 'Near gale', 'Gale', 'Strong gale', 'Storm', 'Violent storm', 'Hurricane'],
  zh: ['无风', '软风', '轻风', '微风', '和风', '清劲风', '强风', '疾风', '大风', '烈风', '狂风', '暴风', '飓风'],
  ja: ['静穏', '至軽風', '軽風', '微風', '和風', '疾強風', '強風', '疾風', '大風', '烈風', '暴風', '猛烈な暴風', '友嵐'],
};

export function beaufortLabel(kmh: number, locale: Locale): string {
  return BEAUFORT[locale]?.[kmhToBeaufort(kmh)] ?? '';
}

const UV: Record<Locale, (uv: number) => string> = {
  ko: (uv) => (uv < 3 ? '낮음' : uv < 6 ? '보통' : uv < 8 ? '높음' : uv < 11 ? '매우 높음' : '위험'),
  en: (uv) => (uv < 3 ? 'Low' : uv < 6 ? 'Moderate' : uv < 8 ? 'High' : uv < 11 ? 'Very high' : 'Extreme'),
  zh: (uv) => (uv < 3 ? '低' : uv < 6 ? '中等' : uv < 8 ? '高' : uv < 11 ? '很高' : '危险'),
  ja: (uv) => (uv < 3 ? '低い' : uv < 6 ? '普通' : uv < 8 ? '高い' : uv < 11 ? '非常に高い' : '危険'),
};

export function uvLabel(locale: Locale, uv: number): string {
  return UV[locale]?.(uv) ?? '';
}

export interface Advice {
  risk: string[];
  outfit: string[];
  plan: string[];
  items: string[];
}

// 언어별 조건부 문구
const T = {
  risk: {
    thunder: { ko: '천둥·번개가 동반되는 날씨입니다. 노상 체류를 줄이고 건물 안에서 안전을 확인하세요.', en: 'Thunderstorms expected — limit time outdoors and stay safe inside.', zh: '有雷暴，请减少在户外停留，待在建筑物内确保安全。', ja: '雷を伴います。屋外での滞在を控え、建物内で安全を確保してください。' },
    rain: { ko: '강한 비가 예상됩니다. 미끄럼과 침수 구간을 조심하세요.', en: 'Heavy rain expected — watch for slips and flooded spots.', zh: '预计有大雨，小心地滑与积水路段。', ja: '強い雨の見込み。滑りや冠水にご注意ください。' },
    wind: { ko: '바람이 매우 강합니다. 우산 날림과 간판·비닐 위험에 유의하세요.', en: 'Very strong wind — beware of blown umbrellas and loose signs/tarps.', zh: '风非常大，注意雨伞被吹翻及招牌、塑料布危险。', ja: '非常に強い風。傘の裏返しや看板・ビニールの危険に注意。' },
    heat: { ko: '폭염 주의: 수분을 자주 섭취하고 그늘에서 휴식하세요.', en: 'Heat warning: drink water often and rest in the shade.', zh: '注意高温：多喝水并在阴凉处休息。', ja: '猛暑注意：こまめに水分補給し日陰で休んでください。' },
    cold: { ko: '한파 주의: 방한용품을 갖추고 동상에 유의하세요.', en: 'Cold warning: bring warm gear and watch for frostbite.', zh: '注意严寒：备好防寒用品并留意冻伤。', ja: '寒波注意：防寒具を用意し、凍傷にご注意を。' },
  },
  outfit: {
    freezing: { ko: '영하권입니다. 패딩·장갑·모자 등 방한용품이 필요합니다.', en: 'Below freezing — bring padded jacket, gloves, and hat.', zh: '零下温度，需准备羽绒服、手套、帽子等防寒用品。', ja: '氷点下です。ダウン・手袋・帽子など防寒具が必要です。' },
    cool: { ko: '아침저녁으로 쌀쌀합니다. 겉옷을 준비하세요.', en: 'Chilly mornings and evenings — bring a layer.', zh: '早晚偏凉，请准备外套。', ja: '朝晩涼しいので上着を用意してください。' },
    hot: { ko: '한낮은 더웁니다. 통풍 좋은 옷차림을 권합니다.', en: 'Hot midday — wear breathable clothing.', zh: '正午较热，建议穿透气衣物。', ja: '日中は暑いので通気性の良い服装を。' },
    windy: { ko: '바람이 강해 모자·우산이 날릴 수 있으니 고정용품을 추천합니다.', en: 'Windy — a secured hat or strap is recommended.', zh: '风大，建议戴不易被吹走的帽子或使用固定物。', ja: '風が強く帽子や傘が飛ぶので固定具があると安心です。' },
  },
  plan: {
    rain: { ko: '비 소식이 있습니다. 지붕 있는 먹거리 골목과 실내 점포 위주로 둘러보세요.', en: 'Rain expected — focus on covered food alleys and indoor stalls.', zh: '有雨，建议以有屋顶的美食巷与室内摊位为主。', ja: '雨の予報。屋根付きの屋台通りや店内を中心に回りましょう。' },
    fine: { ko: '날씨가 양호하면 노상 먹거리 골목과 야외 산책을 즐기기 좋은 날입니다.', en: 'If weather is fine, it is a great day for street-food alleys and outdoor strolls.', zh: '天气好时，适合逛街头美食巷与户外散步。', ja: '天気が良ければ屋台通りや屋外散策にぴったりの日です。' },
    uv: { ko: '자외선이 강합니다. 한낮 시간대 그늘 이용을 권합니다.', en: 'Strong UV — use shade during midday.', zh: '紫外线强，正午请多利用阴凉处。', ja: '紫外線が強いので日中は日陰を利用してください。' },
    cold: { ko: '매서운 추위에는 짧게 여러 차례 둘러보고 실내 휴식을 끼우세요.', en: 'In bitter cold, browse in short bursts with indoor breaks.', zh: '严寒时请分段短暂游览并穿插室内休息。', ja: '厳しい寒さは短時間ずつ回り室内で休憩を。' },
  },
  items: {
    rain: { ko: '우산 또는 비옷', en: 'Umbrella or raincoat', zh: '雨伞或雨衣', ja: '傘またはレインコート' },
    uv: { ko: '선크림·선글라스', en: 'Sunscreen · sunglasses', zh: '防晒霜·太阳镜', ja: '日焼け止め・サングラス' },
    wind: { ko: '바람 고정용 모자', en: 'Wind-secured hat', zh: '防风固定帽', ja: '風対策の帽子' },
    water: { ko: '수분(물)', en: 'Water', zh: '饮水', ja: '水分（水）' },
    cold: { ko: '방한 장갑·보온병', en: 'Warm gloves · thermos', zh: '防寒手套·保温瓶', ja: '防寒手袋・保温ボトル' },
  },
};

// 강릉은 해안가라 바람이 잦고, 겨울은 춥습니다. 시장 특성(노상 먹거리)에 맞춘
// 조건부 조언을 생성합니다. 조건을 만족하는 항목만 배열에 들어가 렌더링됩니다.
export function buildAdvice(w: WeatherPayload | null, locale: Locale): Advice {
  const advice: Advice = { risk: [], outfit: [], plan: [], items: [] };
  if (!w) return advice;
  const L = locale;
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

  if (isThunder) advice.risk.push(T.risk.thunder[L]);
  if (rainProb >= 70 || (code >= 65 && code <= 67)) advice.risk.push(T.risk.rain[L]);
  if (maxBeaufort >= 8) advice.risk.push(T.risk.wind[L]);
  if (tMax >= 33) advice.risk.push(T.risk.heat[L]);
  if (tMin <= -10) advice.risk.push(T.risk.cold[L]);

  if (tMin <= 0) advice.outfit.push(T.outfit.freezing[L]);
  else if (tMin <= 8) advice.outfit.push(T.outfit.cool[L]);
  if (tMax >= 28) advice.outfit.push(T.outfit.hot[L]);
  if (beaufort >= 6) advice.outfit.push(T.outfit.windy[L]);

  if (rainNow || rainProb >= 50) advice.plan.push(T.plan.rain[L]);
  else advice.plan.push(T.plan.fine[L]);
  if (uv >= 6) advice.plan.push(T.plan.uv[L]);
  if (tMax <= 5) advice.plan.push(T.plan.cold[L]);

  if (rainNow || rainProb >= 40) advice.items.push(T.items.rain[L]);
  if (uv >= 3) advice.items.push(T.items.uv[L]);
  if (beaufort >= 5) advice.items.push(T.items.wind[L]);
  if (tMax >= 25 || tMin <= 0) advice.items.push(T.items.water[L]);
  if (tMin <= 5) advice.items.push(T.items.cold[L]);

  return advice;
}
