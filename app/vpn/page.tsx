import type { Metadata } from 'next';
import VpnLanding from './VpnLanding';

const SITE_URL = 'https://dom2-live.ru';

export const metadata: Metadata = {
  title: 'VPN для телефона и компьютера — 24 часа бесплатно',
  description:
    'Быстрый VPN для телефона и компьютера: 24 часа бесплатно, безлимитный трафик, подключение через Hiddify и поддержка при настройке.',
  keywords: ['VPN для телефона', 'VPN для компьютера', 'VPN 24 часа бесплатно', 'VPN Hiddify'],
  alternates: { canonical: '/vpn' },
  openGraph: {
    title: 'VPN для телефона и компьютера — 24 часа бесплатно',
    description: 'Защищённое VPN-соединение с пробным доступом на 24 часа.',
    url: '/vpn',
    type: 'website',
  },
};

const vpnJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': SITE_URL + '/vpn#service',
  name: 'Max Brabus VPN',
  serviceType: 'VPN',
  description:
    'Защищённое VPN-соединение для телефона и компьютера с пробным доступом на 24 часа.',
  url: SITE_URL + '/vpn',
  provider: { '@id': SITE_URL + '/#organization' },
  offers: {
    '@type': 'OfferCatalog',
    name: 'Тарифы Max Brabus VPN',
    itemListElement: [
      { '@type': 'Offer', name: 'Пробный доступ на 24 часа', price: '0', priceCurrency: 'RUB' },
      { '@type': 'Offer', name: 'VPN на 1 месяц', price: '350', priceCurrency: 'RUB' },
      { '@type': 'Offer', name: 'VPN на 3 месяца', price: '900', priceCurrency: 'RUB' },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vpnJsonLd) }}
      />
      <VpnLanding />
    </>
  );
}
