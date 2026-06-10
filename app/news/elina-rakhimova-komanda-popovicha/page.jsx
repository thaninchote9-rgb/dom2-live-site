export const metadata = {
  title: "Элина Рахимова собрала свою команду на Доме 2",
  description: "Элина Рахимова начала рекламировать Влада Поповича и позвала подписчиц прийти к нему на проект, пока Галина Маковская улетела в Нижневартовск.",
  alternates: {
    canonical: "https://dom2-live.ru/news/elina-rakhimova-komanda-popovicha",
  },
  openGraph: {
    title: "Элина Рахимова собрала свою команду на Доме 2",
    description: "Пока Галина Маковская уехала за собакой и вещами, Элина Рахимова предложила подписчицам прийти к Владу Поповичу на проект.",
    url: "https://dom2-live.ru/news/elina-rakhimova-komanda-popovicha",
    type: "article",
    images: ["/news/news-elina-rakhimova-komanda-popovicha.png"],
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
              <span className="block text-xs font-bold text-slate-600">стримы • эфиры • новости</span>
            </span>
          </a>

          <nav className="hidden rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-500 p-[2px] shadow-[0_0_26px_rgba(56,189,248,0.45),0_0_38px_rgba(139,92,246,0.28)] md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/64 px-3 py-2 text-sm font-black text-slate-900 backdrop-blur-2xl">
              <a href="/#watch" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-sky-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-sky-700">Смотреть эфир</a>
              <a href="/archive" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-cyan-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-cyan-700">Предыдущие выпуски</a>
              <a href="/news" className="rounded-full border border-white/70 bg-white/72 px-4 py-2 text-violet-800 shadow-md transition hover:-translate-y-0.5 hover:bg-white/95 hover:text-violet-700">Новости</a>
            </div>
          </nav>
        </div>
      </header>

      <article className="relative z-10 mx-auto max-w-4xl px-4 pb-12 pt-28 md:px-6 md:pb-16 md:pt-32">
        <a href="/news" className="mb-6 inline-flex rounded-full border border-white/80 bg-white/86 px-5 py-3 text-sm font-black text-slate-800 shadow-lg backdrop-blur-2xl hover:bg-white">← Все новости</a>

        <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 shadow-[0_24px_90px_rgba(15,23,42,0.30)] backdrop-blur-3xl">
          <img
            src="/news/news-elina-rakhimova-komanda-popovicha.png"
            alt="Элина Рахимова собрала свою команду на Доме 2"
            className="w-full bg-slate-200 object-cover object-center"
          />

          <div className="p-6 md:p-10">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">05.06.2026</span>
              <span className="rounded-full border border-white/80 bg-white/86 px-4 py-2 text-sm font-black text-slate-800 shadow-lg">Участники</span>
            </div>

            <h1 className="mb-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              Элина Рахимова собрала свою команду на Доме 2
            </h1>

            <p className="mb-5 text-lg leading-8 text-slate-800">
              Галина Маковская не зря переживала за свои отношения. Стоило Гале уехать за периметр, как Элина Рахимова начала активно рекламировать Влада Поповича и предложила своим подписчицам прийти к нему на проект.
            </p>

            <p className="mb-5 text-lg leading-8 text-slate-800">
              При этом Элина сразу предупредила девушек, что Влад сейчас находится в паре. Маковская в это время улетела в Нижневартовск за своей собакой и летними вещами.
            </p>

            <p className="text-lg leading-8 text-slate-800">
              Теперь зрители обсуждают, стоит ли Галине возвращаться на Дом 2 в такой ситуации и как отреагирует Влад Попович на внимание со стороны подписчиц Элины.
            </p>

            <div className="mt-8 grid gap-3 rounded-[1.5rem] border border-white/80 bg-slate-50/80 p-5 text-sm font-bold text-slate-700 md:grid-cols-2">
              <a href="/#watch" className="rounded-full bg-red-600 px-5 py-3 text-center text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-700">Смотреть свежий эфир</a>
              <a href="/news" className="rounded-full bg-white px-5 py-3 text-center text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50">Читать другие новости</a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
