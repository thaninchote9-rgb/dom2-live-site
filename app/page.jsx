import { getNews } from "../lib/news.js";
import { siteConfig, archiveItems, shortVideoItems } from "../lib/home-media.js";
import OliveHome from "./OliveHome";
import "./olive.css";
export const revalidate = 600;
export default async function HomePage() {
  const news = await getNews();
  return <OliveHome news={news.all.slice(0, 15)} config={siteConfig} episodes={archiveItems.slice(0, 3)} shorts={shortVideoItems.slice(0, 10)} />;
}
