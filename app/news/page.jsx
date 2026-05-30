export const metadata = {
  title: "Новости Дом 2 — свежие новости участников",
  description: "Свежие новости Дом 2: участники, уходы с проекта, конкурсы, семьи, обсуждения и события телепроекта.",
  alternates: {
    canonical: "https://dom2-live.ru/news",
  },
};

const newsItems = [
  {
    date: "30.05.2026",
    image: "/news/news-kristina-nikita-left-project.jpg",
    title: "Кристина и Никита покинули проект",
    text: "Кристина и Никита покинули телепроект Дом-2. Новость уже активно обсуждают зрители, а поклонники пары следят за дальнейшими событиями за периметром.",
    tag: "Участники",
  },
  {
    date: "29.05.2026",
    image: "/news/news-tigran-vika-salibekovy.jpg",
    title: "Тигран и Вика Салибековы покинули телепроект Дом-2",
    text: "Стало известно, что Тигран и Вика Салибековы покинули телепроект Дом-2. По словам Кристины Лясковец, семья решила строить любовь за периметром.",
    tag: "Участники",
  },
  {
    date: "29.05.2026",
    image: "/news/news-chelovek-goda.jpg",
    title: "Итоги второго этапа конкурса «Человек года»",
    text: "Света Прель подвела итоги нового этапа конкурса. Победу одержала Элина Рахимова, второе место заняла Кристина Лясковец, а третье место стало неожиданностью для зрителей.",
    tag: "Конкурс",
  },
  {
    date: "29.05.2026",
    image: "/news/news-romashovy.jpg",
    title: "Женя и Настя Ромашовы поделились радостной новостью",
    text: "Ромашовы сообщили поклонникам, что теперь их трое. Пара поделилась трогательной новостью и получила много поздравлений от зрителей проекта.",
    tag: "Семья",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-slate-950 bg-[url('/backgrounds/rain-window.jpg')] bg-cover bg-center bg-fixed text-slate-950">
      <div className="fixed inset-0 bg-slate-950/46 backdrop-blur-[4px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <a href="/" className="mb-6 inline-flex rounded-full border border-white/70 bg-white/82 px-5 py-3 text-sm font-black text-slate-800 shadow-lg backdrop-blur-2xl hover:bg-white">← На главную</a>

        <section className="mb-7 rounded-[2rem] border border-white/75 bg-white/82 p-7 shadow-[0_24px_90px_rgba(15,23,42,0.32)] backdrop-blur-3xl md:p-10">
          <div className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-600">новости проекта</div>
          <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-6xl">Новости Дом 2</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700">Свежие новости участников, уходы с проекта, конкурсы, семьи и обсуждения зрителей.</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/78 p-4 shadow-xl backdrop-blur-3xl">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-lg">
                <img src={item.image} alt={item.title} className="aspect-[4/5] w-full object-cover object-center" />
                <div className="absolute left-4 top-4 rounded-full bg-white/88 px-4 py-2 text-sm font-black text-slate-800 shadow-lg backdrop-blur-xl">{item.tag}</div>
                <div className="absolute right-4 top-4 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg">{item.date}</div>
              </div>
              <div className="p-3">
                <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-600">публикация от {item.date}</div>
                <h2 className="mb-3 text-xl font-black leading-snug text-slate-950">{item.title}</h2>
                <p className="text-sm leading-6 text-slate-700">{item.text}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
