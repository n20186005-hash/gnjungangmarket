// JSON-LD 구조화 데이터 빌더. 모든 실체 사실은 src/config.ts(ATTRACTION)에서 가져옵니다.
import { ATTRACTION, HOURS, DOMAIN } from '../config';
import { siteName, ui, localizedPath, type Locale, type FaqItem } from '../i18n';

export function marketJsonLd(): Record<string, unknown> {
  const { geo, rating, reviewCount } = ATTRACTION;
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'LocalBusiness', 'TouristDestination'],
    '@id': 'https://gnjungangmarket.com/#market',
    name: `${ATTRACTION.nameKo} (${ATTRACTION.nameEn})`,
    alternateName: ATTRACTION.alternateName,
    description: ATTRACTION.description,
    url: 'https://gnjungangmarket.com/',
    image: 'https://gnjungangmarket.com/brand/og-card.svg',
    telephone: ATTRACTION.telephone,
    priceRange: '₩',
    address: {
      '@type': 'PostalAddress',
      streetAddress: ATTRACTION.address.streetEn,
      addressLocality: ATTRACTION.address.city,
      addressRegion: ATTRACTION.address.region,
      postalCode: ATTRACTION.address.postalCode,
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: HOURS.opens,
        closes: HOURS.closes,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [ATTRACTION.mapsUrl],
  };
}

export function webSiteJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName[locale],
    url: 'https://gnjungangmarket.com/',
    inLanguage: locale === 'ko' ? 'ko-KR' : locale,
  };
}

export function breadcrumbJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: ui[locale].footer.home,
        item: `https://${DOMAIN}${localizedPath(locale)}`,
      },
    ],
  };
}

export function faqJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    })),
  };
}

// 한 페이지(언어)에 들어가는 전체 JSON-LD 묶음
export function buildSchemas(locale: Locale): Record<string, unknown>[] {
  return [
    webSiteJsonLd(locale),
    marketJsonLd(),
    breadcrumbJsonLd(locale),
    faqJsonLd(ui[locale].faq.items),
  ];
}
