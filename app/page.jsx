import { getNews } from "../lib/news.js";
import { siteConfig, archiveItems, shortVideoItems } from "../lib/home-media.js";
import { getEpisodeFeed } from "../lib/episode-pages.js";
import { getYoutubeShorts } from "../lib/youtube-shorts.js";
import OliveHome from "./OliveHome";
import "./olive.css";

export const metadata = {
  title: { absolute: "Дом 2 смотреть онлайн бесплатно — Дом 2 Live" },
  description: "Смотри Дом 2 онлайн бесплатно. Последний выпуск, свежие серии и архив эфиров по датам, короткие видео и новости участников.",
  alternates: { canonical: "/" },
};

export const revalidate = 0;

export default async function HomePage() {
  const [news, feed, youtubeShorts] = await Promise.all([getNews(), getEpisodeFeed(), getYoutubeShorts()]);
  const fallback = {
    videoId: siteConfig.currentVideoId,
    title: "Запись эфира Дом 2",
    date: null,
    videoUrl: `https://www.youtube.com/watch?v=${siteConfig.currentVideoId}`,
    image: `https://img.youtube.com/vi/${siteConfig.currentVideoId}/hqdefault.jpg`,
  };
  const current = feed.current ?? fallback;
  const seen = new Set([current.videoId]);
  const episodes = [...feed.episodes, ...archiveItems]
    .map((item) => ({
      ...item,
      videoId: item.videoId || item.videoUrl?.match(/(?:live\/|v=)([A-Za-z0-9_-]{11})/)?.[1],
    }))
    .filter((item) => {
      if (!item.videoId || seen.has(item.videoId)) return false;
      seen.add(item.videoId);
      return true;
    })
    .slice(0, 3);

  return <OliveHome news={news.all.slice(0, 15)} config={siteConfig} current={current} episodes={episodes} shorts={youtubeShorts ?? shortVideoItems.slice(0, 10)} />;
}
