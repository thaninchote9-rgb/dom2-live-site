export const metadata = {
  title: "Новости Дом 2 — участники, события и обсуждения",
  description: "Свежие новости Дом 2: участники, уходы с проекта, конкурсы, семьи, обсуждения и события телепроекта.",
  alternates: { canonical: "https://dom2-live.ru/novosti" },
  openGraph: {
    title: "Новости Дом 2 — участники, события и обсуждения",
    description: "Свежие новости Дом 2: участники, уходы с проекта, конкурсы, семьи, обсуждения и события телепроекта.",
    url: "https://dom2-live.ru/novosti",
    siteName: "Дом 2 Live",
    type: "website",
  },
};

export default function SeoPage() {
  return (
    <main className="min-h-screen bg-slate-950 bg-[url('/backgrounds/rain-window.jpg')] bg-cover bg-center bg-fixed text-slate-950">
      <div className="fixed inset-0 bg-slate-950/46 backdrop-blur-[4px]" />
      <div className="relative z-10 mx-auto max-w-[1120px] px-4 py-10 md:px-6 md:py-14">
        <a href="/" className="mb-6 inline-flex rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-black text-slate-800 shadow-lg backdrop-blur-2xl hover:bg-white">← На главную</a>
        <section className="rounded-[2rem] border border-white/75 bg-white/82 p-7 shadow-[0_24px_90px_rgba(15,23,42,0.32)] backdrop-blur-3xl md:p-10">
          <div className="mb-4 inline-flex rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-black text-slate-600 shadow-md">Дом 2 Live</div>
          <h1 className="mb-5 text-4xl font-black leading-tight text-slate-950 md:text-6xl">Новости Дом 2</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700">В этом разделе собраны новости проекта Дом 2: важные события, участники, уходы, конкурсы и обсуждения зрителей.</p>
          <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-md backdrop-blur-xl">новости дом 2</span>
              <span className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-md backdrop-blur-xl">дом 2 новости</span>
              <span className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-md backdrop-blur-xl">участники дом 2</span>
              <span className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-md backdrop-blur-xl">дом 2 последние новости</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/#watch" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-slate-800">Смотреть эфир</a>
            <a href="/#archive" className="rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-black text-slate-800 shadow-lg hover:bg-white">Предыдущие выпуски</a>
            <a href="/#news" className="rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-black text-slate-800 shadow-lg hover:bg-white">Новости</a>
          </div>
        </section>
        <section className="mt-6 grid gap-5">
          <article className="rounded-[1.6rem] border border-white/70 bg-white/78 p-6 shadow-xl backdrop-blur-3xl">
            <h2 className="mb-3 text-2xl font-black text-slate-950">Свежий выпуск и архив</h2>
            <p className="text-base leading-8 text-slate-700">На сайте обновляется текущий эфир, а предыдущие выпуски переносятся в архив. Так зрителям удобно смотреть Дом 2 онлайн и возвращаться к прошлым сериям.</p>
          </article>
          <article className="rounded-[1.6rem] border border-white/70 bg-white/78 p-6 shadow-xl backdrop-blur-3xl">
            <h2 className="mb-3 text-2xl font-black text-slate-950">Новости участников</h2>
            <p className="text-base leading-8 text-slate-700">Рядом с выпусками публикуются новости участников проекта, уходы, конкурсы, семейные события и обсуждения зрителей.</p>
          </article>
          <article className="rounded-[1.6rem] border border-white/70 bg-white/78 p-6 shadow-xl backdrop-blur-3xl">
            <h2 className="mb-3 text-2xl font-black text-slate-950">Удобная навигация</h2>
            <p className="text-base leading-8 text-slate-700">Страница помогает быстро перейти к эфиру, архиву и новостям, а также усиливает структуру сайта для Google и Яндекса.</p>
          </article>
        </section>
        <section className="mt-6 rounded-[2rem] border border-white/75 bg-white/82 p-7 shadow-xl backdrop-blur-3xl md:p-10">
          <h2 className="mb-4 text-3xl font-black text-slate-950">Популярные разделы</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <a className="rounded-3xl border border-white/70 bg-white/75 p-5 font-black text-slate-800 shadow-md hover:bg-white" href="/dom-2-smotret-online">Дом 2 смотреть онлайн</a>
            <a className="rounded-3xl border border-white/70 bg-white/75 p-5 font-black text-slate-800 shadow-md hover:bg-white" href="/dom-2-svezhie-serii">Дом 2 свежие серии</a>
            <a className="rounded-3xl border border-white/70 bg-white/75 p-5 font-black text-slate-800 shadow-md hover:bg-white" href="/dom-2-segodnya">Дом 2 сегодня</a>
            <a className="rounded-3xl border border-white/70 bg-white/75 p-5 font-black text-slate-800 shadow-md hover:bg-white" href="/novosti">Новости Дом 2</a>
          </div>
        </section>
      </div>
    </main>
  );
}
