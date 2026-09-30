// JSON-LD 구조화 데이터 빌더. 모든 실체 사실은 src/config.ts(ATTRACTION)에서 가져옵니다.
import { ATTRACTION, HOURS, SITE_NAME } from '../config';

interface FaqItem {
  q: string;
  a: string;
}

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

export function webSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: 'https://gnjungangmarket.com/',
    inLanguage: 'ko-KR',
  };
}

export function breadcrumbJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://gnjungangmarket.com/',
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
