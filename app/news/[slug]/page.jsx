import { notFound } from "next/navigation";
import { findManual } from "../../../lib/news.js";
import { getTelegramPost, parseSlug } from "../../../lib/telegram.js";

export const revalidate = 600;

// Единая ссылка для кнопки на всех текущих и будущих страницах новостей.
const TELEGRAM_CHANNEL_URL = "https://t.me/maxbrabusstrim";

async function getArticle(slug) {
  const manual = findManual(slug);
  if (manual) return manual;

  const parsed = parseSlug(slug);
  if (!parsed) return null;
  return getTelegramPost(parsed.channelKey, parsed.postId);
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Новость не найдена" };

  return {
    title: article.title,
    description: article.text,
    alternates: { canonical: `https://dom2-live.ru/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.text,
      images: article.rawImage || article.image,
      type: "article",
    },
  };
}

export default async function NewsArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const paragraphs = article.paragraphs?.filter(Boolean) || [article.text];

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#dbeafe,#fdf2f8_48%,#e0f2fe)] text-slate-900">
      <header className="border-b border-white/50 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
          <a href="/" className="font-black text-slate-950">▶ Дом 2 Live</a>
          <a href="/news" className="text-sm font-bold text-sky-700">Все новости</a>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <a href="/news" className="text-sm font-bold text-sky-700">← К списку новостей</a>
        <div className="mt-7 flex flex-wrap items-center gap-3 text-sm font-black">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-white">{article.tag}</span>
          <time className="text-slate-600">{article.date}</time>
          {article.source === "telegram" ? <span className="text-slate-500">Telegram</span> : null}
        </div>
        <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight md:text-5xl">{article.title}</h1>

        <img src={article.image} alt={article.title} className="mt-8 aspect-video w-full rounded-3xl object-cover shadow-xl" />

        <div className="mt-8 space-y-5 text-lg leading-8 text-slate-800">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>

        {article.postUrl ? (
          <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-2xl bg-sky-600 px-5 py-3 font-black text-white shadow-lg transition hover:bg-sky-700">
            Открыть оригинал в Telegram →
          </a>
        ) : null}
      </article>
    </main>
  );
}
