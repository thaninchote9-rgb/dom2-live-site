import { getNews } from "../lib/news.js";
import { siteConfig, archiveItems, shortVideoItems } from "../lib/home-media.js";
import { formatAdminVideo, getSiteVideos } from "../lib/site-videos.js";
import { getYoutubeShorts } from "../lib/youtube-shorts.js";
import OliveHome from "./OliveHome";
import "./olive.css";
export const revalidate = 30;
export default async function HomePage() {
  const [news, adminVideos, youtubeShorts] = await Promise.all([getNews(), getSiteVideos(), getYoutubeShorts()]);
  const fallbackCurrent = {
    videoId: siteConfig.currentVideoId,
    title: "Предыдущий выпуск",
    date: "Ранее",
    videoUrl: `https://www.youtube.com/watch?v=${siteConfig.currentVideoId}`,
    image: `https://img.youtube.com/vi/${siteConfig.currentVideoId}/hqdefault.jpg`,
  };
  const current = adminVideos.current
    ? formatAdminVideo(adminVideos.current)
    : { ...fallbackCurrent, title: "Последний выпуск" };
  const recentCandidates = [
    ...adminVideos.recent.map(formatAdminVideo),
    ...(adminVideos.current ? [fallbackCurrent] : []),
    ...archiveItems,
  ];
  const seen = new Set([current.videoId]);
  const episodes = recentCandidates
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
  const shorts = youtubeShorts.length ? youtubeShorts : shortVideoItems.slice(0, 10);
  return <OliveHome news={news.all.slice(0, 15)} config={siteConfig} current={current} episodes={episodes} shorts={shorts} />;
}
