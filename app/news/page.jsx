import { getNews } from "../../lib/news.js";

export const revalidate = 600;

export const metadata = {
  title: "Новости Дом 2 — свежие новости участников",
  description: "Свежие новости Дом 2 из Telegram-каналов и ручного архива сайта.",
  alternates: { canonical: "https://dom2-live.ru/news" },
};

function Header() {
  return (
    <header className="border-b border-white/50 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <a href="/" className="font-black text-slate-950">▶ Дом 2 Live</a>
        <nav className="flex gap-3 text-sm font-bold text-slate-700">
          <a href="/#watch">Смотреть эфир</a>
          <a href="/archive">Предыдущие выпуски</a>
          <a href="/news">Новости</a>
        </nav>
      </div>
    </header>
  );
}

export default async function NewsPage() {
  const { all } = await getNews();

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#dbeafe,#fdf2f8_48%,#e0f2fe)] text-slate-900">
      <Header />
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <a href="/" className="text-sm font-bold text-sky-700">← На главную</a>
        <p className="mt-7 text-sm font-black uppercase tracking-[0.22em] text-slate-600">новости проекта</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Новости Дом 2</h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          Свежие публикации из Telegram-каналов и проверенный архив новостей сайта.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((item) => (
            <a key={item.slug} href={item.href} className="group overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <img src={item.image} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 text-xs font-black">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-white">{item.tag}</span>
                  <time className="text-slate-600">{item.date}</time>
                </div>
                <h2 className="mt-4 text-xl font-black leading-snug">{item.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">{item.text}</p>
                <span className="mt-4 inline-block text-sm font-black text-sky-700">Читать полностью →</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
