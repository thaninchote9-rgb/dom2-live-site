import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://dom2-live.ru"),
  title: {
    default: "Дом 2 смотреть онлайн бесплатно — сегодняшний выпуск",
    template: "%s | Дом 2 Live",
  },
  description:
    "Дом 2 сегодняшний выпуск и свежие серии смотреть онлайн бесплатно в хорошем качестве. Последние выпуски, короткие видео и новости участников.",
  keywords: [
    "дом 2",
    "дом 2 смотреть",
    "дом 2 смотреть онлайн",
    "дом 2 смотреть бесплатно",
    "дом 2 свежие серии смотреть бесплатно",
    "дом 2 смотреть в хорошем качестве",
    "дом 2 сегодняшний выпуск",
    "новости дом 2",
  ],
  openGraph: {
    title: "Дом 2 смотреть онлайн бесплатно — сегодняшний выпуск",
    description:
      "Сегодняшний выпуск и свежие серии Дом 2, короткие видео и новости участников.",
    url: "https://dom2-live.ru",
    siteName: "Дом 2 Live",
    locale: "ru_RU",
    type: "website",
    images: ["/og-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Дом 2 смотреть онлайн бесплатно — сегодняшний выпуск",
    description:
      "Сегодняшний выпуск и свежие серии Дом 2, короткие видео и новости участников.",
    images: ["/og-cover.jpg"],
  },
  verification: {
    google: "ciwbmJzu6dp3q8i3fMcAjuXVoi3G4k6kh9G2AwzSsg0",
    yandex: "c5326ec331a378a4",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body><script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: `[{"@context":"https://schema.org","@type":"WebSite","name":"Дом 2 Live","url":"https://dom2-live.ru","inLanguage":"ru-RU"},{"@context":"https://schema.org","@type":"Organization","name":"Дом 2 Live","url":"https://dom2-live.ru","logo":"https://dom2-live.ru/icon-192.png","sameAs":["https://www.youtube.com/@WardaYosry-g9d","https://t.me/maxbrabusstrim"]}]` }}
        />
        {children}        <Analytics />
      </body>
    </html>
  );
}
