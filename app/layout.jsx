import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://dom2-live.ru"),
  title: {
    default: "Дом 2 смотреть онлайн бесплатно — Дом 2 Live",
    template: "%s | Дом 2 Live",
  },
  description:
    "Смотри Дом 2 онлайн бесплатно. Свежие выпуски, архив эфиров и новости участников.",
  openGraph: {
    title: "Дом 2 смотреть онлайн бесплатно — Дом 2 Live",
    description:
      "Последние выпуски Дома-2, архив эфиров и новости участников.",
    url: "https://dom2-live.ru",
    siteName: "Дом 2 Live",
    locale: "ru_RU",
    type: "website",
    images: ["/og-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Дом 2 смотреть онлайн бесплатно — Дом 2 Live",
    description:
      "Последние выпуски Дома-2, архив эфиров и новости участников.",
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
          dangerouslySetInnerHTML={{ __html: `[{"@context":"https://schema.org","@type":"WebSite","name":"Дом 2 Live","url":"https://dom2-live.ru","inLanguage":"ru-RU"},{"@context":"https://schema.org","@type":"Organization","name":"Дом 2 Live","url":"https://dom2-live.ru","logo":"https://dom2-live.ru/icon-192.png","sameAs":["https://www.youtube.com/@MaxBrabusRPL","https://t.me/maxbrabusstrim"]}]` }}
        />
        {children}
        {process.env.VERCEL ? (
          <Analytics />
        ) : process.env.NODE_ENV === "production" ? (
          <Script
            src="/brabus-insights.js"
            data-website-id="a6d087a7-68c4-4947-8de0-8e084b302fbd"
            data-domains="dom2-live.ru"
            data-exclude-search="true"
            data-exclude-hash="true"
          />
        ) : null}
      </body>
    </html>
  );
}
