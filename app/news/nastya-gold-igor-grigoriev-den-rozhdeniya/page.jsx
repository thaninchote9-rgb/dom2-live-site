export const metadata = {
  title: "Настя Голд отметила день рождения с Игорем Григорьевым — Дом 2",
  description: "День рождения Насти Голд превратился в вечер на двоих с Игорем Григорьевым. Он осыпал её комплиментами, она краснела. Зрители гадают: роман или дружба?",
  alternates: {
    canonical: "https://dom2-live.ru/news/nastya-gold-igor-grigoriev-den-rozhdeniya",
  },
  openGraph: {
    title: "Настя Голд отметила день рождения с Игорем Григорьевым — больше никто не пришёл",
    description: "День рождения Насти Голд превратился в камерный вечер на двоих с Игорем Григорьевым. Комплименты, смущение и вопрос: роман или просто дружба?",
    url: "https://dom2-live.ru/news/nastya-gold-igor-grigoriev-den-rozhdeniya",
    type: "article",
    images: ["/news/news-nastya-gold-igor-grigoriev.jpg"],
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

          <nav className="hidden md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/72 px-2 py-2 text-sm font-black text-slate-900 shadow-lg backdrop-blur-2xl">
              <a href="/#watch" className="rounded-full px-4 py-2 text-slate-700 transition hover:text-slate-900">Эфир</a>
              <a href="/archive" className="rounded-full px-4 py-2 text-slate-700 transition hover:text-slate-900">Предыдущие выпуски</a>
              <a href="/news" className="rounded-full bg-white/90 px-4 py-2 text-slate-950 shadow-md transition hover:-translate-y-0.5 hover:bg-white">Новости</a>
              <a href="https://www.youtube.com/@ThomasKing4771/shorts" target="_blank" rel="noreferrer" className="rounded-full px-4 py-2 text-slate-700 transition hover:text-slate-900">Видео участников</a>
            </div>
          </nav>
        </div>
      </header>

      <article className="relative z-10 mx-auto max-w-4xl px-4 pb-12 pt-28 md:px-6 md:pb-16 md:pt-32">
        <a href="/news" className="mb-6 inline-flex rounded-full border border-white/80 bg-white/86 px-5 py-3 text-sm font-black text-slate-800 shadow-lg backdrop-blur-2xl hover:bg-white">← Все новости</a>

        <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 shadow-[0_24px_90px_rgba(15,23,42,0.30)] backdrop-blur-3xl">
          <img
            src="/news/news-nastya-gold-igor-grigoriev.jpg"
            alt="Настя Голд и Игорь Григорьев отмечают день рождения"
            className="w-full bg-slate-200 object-cover object-center"
          />

          <div className="p-6 md:p-10">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">13.06.2026</span>
              <span className="rounded-full border border-white/80 bg-white/86 px-4 py-2 text-sm font-black text-slate-800 shadow-lg">Отношения</span>
            </div>

            <h1 className="mb-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              Настя Голд отметила день рождения с Игорем Григорьевым — и больше никто не пришёл
            </h1>

            <p className="mb-5 text-lg leading-8 text-slate-800">
              День рождения Насти Голд неожиданно превратился в камерный вечер на двоих. Из всего окружения участницы рядом с ней в этот день оказался только Игорь Григорьев — и, судя по всему, именно он сделал праздник по-настоящему тёплым.
            </p>

            <p className="mb-5 text-lg leading-8 text-slate-800">
              Игорь не скупился на комплименты: говорил искренне, с вниманием и теплотой. Настя в ответ смущалась и краснела — и это не осталось незамеченным. Зрители, которые следят за парой, сразу обратили внимание на атмосферу между ними.
            </p>

            <p className="mb-5 text-lg leading-8 text-slate-800">
              Показательно и то, что больше никто не пришёл. Это либо говорит о том, что Настя намеренно выбрала именно Игоря для такого личного момента, либо он сам проявил инициативу и не упустил возможность быть рядом.
            </p>

            <p className="text-lg leading-8 text-slate-800">
              Зрители Дома-2 уже вовсю обсуждают: это просто дружеская поддержка или начало чего-то большего? Симпатия между Настей и Игорем давно витает в воздухе — и, похоже, день рождения стал ещё одним намёком на то, что между ними происходит что-то интересное.
            </p>

            <div className="mt-8 grid gap-3 rounded-[1.5rem] border border-white/80 bg-slate-50/80 p-5 text-sm font-bold text-slate-700 md:grid-cols-3">
              <a href="/#watch" className="rounded-full bg-red-600 px-5 py-3 text-center text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-700">Смотреть свежий эфир</a>
              <a href="/news" className="rounded-full bg-white px-5 py-3 text-center text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50">Читать другие новости</a>
              <a href="https://t.me/maxbrabusstrim" target="_blank" rel="noreferrer" className="rounded-full bg-sky-500 px-5 py-3 text-center text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-sky-600">Обсудить в Telegram</a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
