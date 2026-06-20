import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://dom2-live.ru"),
  title: {
    default: "Дом 2 смотреть онлайн — свежий выпуск сегодня",
    template: "%s | Дом 2 Live",
  },
  description:
    "Смотреть дом 2 онлайн, свежий выпуск сегодня, стримы дом 2, архив эфиров и новости участников.",
  keywords: [
    "дом 2",
    "дом 2 смотреть",
    "дом 2 смотреть онлайн",
    "дом 2 сегодняшний выпуск",
    "дом 2 стримы",
    "дом 2 свежий выпуск",
    "дом 2 live",
  ],
  openGraph: {
    title: "Дом 2 смотреть онлайн — свежий выпуск сегодня",
    description:
      "Смотреть дом 2 онлайн, свежий выпуск сегодня, стримы дом 2 и архив эфиров.",
    url: "https://dom2-live.ru",
    siteName: "Дом 2 Live",
    locale: "ru_RU",
    type: "website",
    images: ["/og-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Дом 2 смотреть онлайн — свежий выпуск сегодня",
    description:
      "Смотреть дом 2 онлайн, свежий выпуск сегодня, стримы дом 2 и архив эфиров.",
    images: ["/og-cover.jpg"],
  },
  alternates: {
    canonical: "https://dom2-live.ru",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "igwl-wJHRiLb6MN3bvDE3ffIBtl9XpAfWALlPbPNo6U",
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
          dangerouslySetInnerHTML={{ __html: `[{"@context":"https://schema.org","@type":"WebSite","name":"Дом 2 Live","url":"https://dom2-live.ru","inLanguage":"ru-RU"},{"@context":"https://schema.org","@type":"Organization","name":"Дом 2 Live","url":"https://dom2-live.ru","logo":"https://dom2-live.ru/icon-192.png","sameAs":["https://www.youtube.com/@ThomasKing4771","https://t.me/maxbrabusstrim"]}]` }}
        />
        {children}        <Analytics />
      </body>
    </html>
  );
}
