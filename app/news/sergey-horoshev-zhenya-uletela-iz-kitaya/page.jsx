export const metadata = {
  title: "Сергей Хорошев сообщил, что Женя улетела из Китая — Дом 2 Live",
  description: "Сергей Хорошев рассказал, что Женя собрала вещи и улетела из Китая после конфликта и накопившегося недопонимания.",
  alternates: {
    canonical: "https://dom2-live.ru/news/sergey-horoshev-zhenya-uletela-iz-kitaya",
  },
  openGraph: {
    title: "Сергей Хорошев сообщил, что Женя улетела из Китая — Дом 2 Live",
    description: "Сергей Хорошев рассказал, что Женя собрала вещи и улетела из Китая после конфликта и накопившегося недопонимания.",
    url: "https://dom2-live.ru/news/sergey-horoshev-zhenya-uletela-iz-kitaya",
    images: ["https://dom2-live.ru/news/news-zhenya-horosheva-left-china.jpg"],
    type: "article",
  },
};

export default function NewsArticlePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(219,234,254,0.95),transparent_34%),radial-gradient(circle_at_top_right,rgba(243,232,255,0.90),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(224,242,254,0.92),transparent_38%),linear-gradient(135deg,#eef6ff_0%,#f8fbff_48%,#f4efff_100%)] text-slate-950">
      <div className="fixed inset-0 bg-white/10" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/65 bg-white/86 shadow-lg backdrop-blur-3xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/80 text-xl shadow-lg backdrop-blur-xl">▶️</span>
            <span>
              <span className="block text-lg font-black leading-5 text-slate-950">Дом 2 Live</span>
              <span className="block text-xs font-bold text-slate-600">стримы • эфиры • архив</span>
            </span>
          </a>

          <nav className="hidden rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-500 p-[2px] shadow-[0_0_26px_rgba(56,189,248,0.45),0_0_38px_rgba(139,92,246,0.28)] md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/64 px-3 py-2 text-sm font-black text-slate-900 backdrop-blur-2xl">
              <a href="/#watch" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-sky-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-sky-700 hover:shadow-[0_0_18px_rgba(56,189,248,0.45)]">Смотреть эфир</a>
              <a href="/archive" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-cyan-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-cyan-700 hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]">Предыдущие выпуски</a>
              <a href="/news" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-violet-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-violet-700 hover:shadow-[0_0_18px_rgba(139,92,246,0.45)]">Новости</a>
              <a href="/#about" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-fuchsia-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-fuchsia-700 hover:shadow-[0_0_18px_rgba(217,70,239,0.42)]">О проекте</a>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="rounded-full border border-red-500/50 bg-white/84 px-4 py-2 text-sm font-black text-red-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-red-500/80 hover:bg-red-50/90 hover:text-red-700">
              YouTube
            </a>
            <a href="https://t.me/" target="_blank" rel="noreferrer" className="rounded-full border border-sky-500/55 bg-white/84 px-4 py-2 text-sm font-black text-sky-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-500/85 hover:bg-sky-50/90 hover:text-sky-700">
              Telegram
            </a>
          </div>
        </div>
      </header>

      <article className="relative z-10 mx-auto max-w-4xl px-4 pb-12 pt-28 md:px-6 md:pb-16 md:pt-32">
        <a href="/news" className="mb-6 inline-flex rounded-full border border-white/80 bg-white/86 px-5 py-3 text-sm font-black text-slate-800 shadow-lg backdrop-blur-2xl hover:bg-white">← Все новости</a>

        <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_24px_90px_rgba(15,23,42,0.38)] backdrop-blur-3xl">
          <div className="relative">
            <img src="/news/news-zhenya-horosheva-left-china.jpg" alt="Сергей Хорошев сообщил, что Женя улетела из Китая" className="max-h-[620px] w-full object-cover object-center" />
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-slate-800 shadow-lg backdrop-blur-xl">Участники</div>
            <div className="absolute right-4 top-4 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg">04.06.2026</div>
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-700">новость дом 2</div>
            <h1 className="mb-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">Сергей Хорошев сообщил, что Женя улетела из Китая</h1>

            <div className="mb-6 flex flex-wrap gap-3 text-sm font-bold text-slate-700">
              <span className="rounded-full bg-slate-100 px-4 py-2">Дата публикации: 04.06.2026</span>
              <span className="rounded-full bg-slate-100 px-4 py-2">Раздел: Участники</span>
            </div>

            <div className="space-y-5 text-base leading-8 text-slate-800 md:text-lg">
              <p>Сергей Хорошев сообщил, что Женя собрала вещи и улетела из Китая. По его словам, между ними снова произошёл тяжёлый разговор, в котором они наговорили друг другу много лишнего.</p>
              <p>Сергей отметил, что в отношениях накопилось недопонимание, а сама ситуация получилась печальной. Теперь зрители обсуждают, станет ли этот конфликт окончательной точкой или пара всё же сможет снова выйти на связь и спокойно поговорить.</p>
              <p>На сайте Дом 2 Live мы продолжаем следить за новостями участников проекта и обновлять раздел с публикациями, чтобы важные события были доступны отдельными страницами.</p>
            </div>

            <div className="mt-8 grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 md:grid-cols-3">
              <a href="/news" className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-slate-800 shadow-sm hover:bg-slate-100">Все новости</a>
              <a href="/news/karina-titueva-pokinula-proekt-dom-2" className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-slate-800 shadow-sm hover:bg-slate-100">Карина Титуева покинула проект Дом-2</a>
              <a href="/archive" className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-slate-800 shadow-sm hover:bg-slate-100">Предыдущие выпуски</a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
