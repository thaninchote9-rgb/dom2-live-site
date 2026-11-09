import { getEpisodeFeed, siteOrigin, todayPath } from "../lib/episode-pages.js";
import { getNews } from "../lib/news.js";

// Даты изменений выпусков берутся из ленты админки.
export const revalidate = 0;

const baseUrl = siteOrigin;

/** Статичные разделы сайта. */
const staticRoutes = [
  "/",
  "/novosti",
  "/archive",
  "/news",
  todayPath,
  "/smotret-dom-2-ne-iz-rf",
  "/vpn",
];

/** Ручные статьи — остаются в индексе навсегда. */
const manualArticles = [
  "/news/nikita-guranda-otvetil-na-voprosy",
  "/news/dasha-vinogradova-pokinula-proekt",
  "/news/nastya-gold-igor-grigoriev-den-rozhdeniya",
  "/news/karina-titueva-pokinula-proekt-dom-2",
  "/news/sergey-horoshev-zhenya-uletela-iz-kitaya",
  "/news/novye-kadry-uchastnits-dom2",
  "/news/dom-2-vypuski-online-besplatno",
  "/news/andrey-cherkasov-nastavnitsy-grakovich-rakhimova",
  "/news/kristina-lyaskovets-zhenskaya-druzhba",
  "/news/vika-salibekova-poblagodarila-proekt",
  "/news/elina-rakhimova-danya-sakhnov",
  "/news/elina-rakhimova-komanda-popovicha",
  "/news/zhenya-horosheva-razvod-sergey",
];

export default async function sitemap() {
  const { current } = await getEpisodeFeed();
  const base = [...staticRoutes, ...manualArticles].map((route) => ({
    url: `${baseUrl}${route}`,
    ...((route === todayPath || route === "/archive") && current?.addedAt ? { lastModified: current.addedAt } : {}),
  }));

  // Свежие новости из Telegram.
  let telegram = [];
  try {
    const news = await getNews();
    // Include the complete manual archive, not just the separately authored routes.
    telegram = news.all.map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "daily",
      priority: 0.9,
    }));
  } catch {
    // Telegram недоступен — отдаём хотя бы статичную часть карты.
  }

  // На случай совпадений оставляем уникальные URL.
  const seen = new Set();
  return [...telegram, ...base].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
