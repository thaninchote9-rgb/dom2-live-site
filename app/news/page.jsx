export const metadata = {
  title: "Новости Дом 2 — свежие новости участников",
  description: "Свежие новости Дом 2: участники, уходы с проекта, конкурсы, семьи, обсуждения и события телепроекта.",
  alternates: {
    canonical: "https://dom2-live.ru/news",
  },
};

const newsItems = [
  {
    date: "13.06.2026",
    image: "/news/news-nastya-gold-igor-grigoriev.jpg",
    title: "Настя Голд отметила день рождения с Игорем Григорьевым — и больше никто не пришёл",
    text: "День рождения Насти Голд неожиданно превратился в камерный вечер на двоих: из всех, кого она могла бы позвать, рядом оказался только Игорь Григорьев. Он не скупился на комплименты — Настя смущалась и краснела. Зрители уже вовсю обсуждают: это просто дружеская поддержка или начало чего-то большего?",
    tag: "Отношения",
    href: "/news/nastya-gold-igor-grigoriev-den-rozhdeniya",
  },

  {
    date: "10.06.2026",
    image: "/news/news-cherkasov-grakovich-rakhimova.png",
    title: "Андрей Черкасов подтвердил роль наставниц Гракович и Рахимовой на проекте",
    text: "Андрей Черкасов подтвердил, что Вероника Гракович и Элина Рахимова выполняют на поляне роль наставниц для молодёжного коллектива. Зрители давно обсуждали, какие функции у этого тандема на проекте.",
    tag: "Участники",
    href: "/news/andrey-cherkasov-nastavnitsy-grakovich-rakhimova",
  },

  {
    date: "07.06.2026",
    image: "/news/news-kristina-lyaskovets-female-friendship.png",
    title: "Кристина Лясковец рассказала о важности женской дружбы",
    text: "Кристина Лясковец поделилась тёплой публикацией о подругах и женской поддержке. По её словам, очень важно встретить своего человека, который поймёт, выслушает, поддержит и не осудит.",
    tag: "Участники",
    href: "/news/kristina-lyaskovets-zhenskaya-druzhba",
  },

  {
    date: "07.06.2026",
    image: "/news/news-vika-salibekova-thanks-project.jpg",
    title: "Вика Салибекова поблагодарила проект Дом-2 и зрителей",
    text: "Вика Салибекова вышла на связь после ухода с проекта. Она поблагодарила Дом-2 и зрителей за переживания, вспомнила три совместных года на проекте и призналась, что будет скучать по своей комнате.",
    tag: "Участники",
    href: "/news/vika-salibekova-poblagodarila-proekt",
  },

  {
    date: "05.06.2026",
    image: "/news/news-zhenya-horosheva-divorce-sergey.png",
    title: "Женя Хорошева хочет развестись с Сергеем",
    text: "Женя Хорошева написала, что устала от конфликтов с Сергеем и хочет спокойно развестись без грязи. По её словам, она мечтает о семье, детях и спокойной жизни, а не о постоянном соперничестве в отношениях.",
    tag: "Отношения",
    href: "/news/zhenya-horosheva-razvod-sergey",
  },

  {
    date: "05.06.2026",
    image: "/news/news-elina-rakhimova-komanda-popovicha.png",
    title: "Элина Рахимова собрала свою команду на Доме 2",
    text: "Пока Галина Маковская улетела в Нижневартовск за собакой и летними вещами, Элина Рахимова начала рекламировать Влада Поповича и позвала подписчиц прийти к нему на проект, предупредив, что он сейчас в паре.",
    tag: "Участники",
    href: "/news/elina-rakhimova-komanda-popovicha",
  },

  {
    date: "04.06.2026",
    image: "/news/news-elina-rakhimova-danya-sakhnov.png",
    title: "Элина Рахимова рассказала о флирте с Даней Сахновым",
    text: "Элина Рахимова сообщила, что всю ночь общалась с экс-участником проекта Даней Сахновым, услышала много комплиментов и даже представила их идеальной парой. Но Даниил прекратил общение, не приехал на поляну и не пригласил её на свидание.",
    tag: "Отношения",
    href: "/news/elina-rakhimova-danya-sakhnov",
  },

  {
    date: "04.06.2026",
    image: "/news/news-zhenya-horosheva-left-china.jpg",
    title: "Сергей Хорошев сообщил, что Женя улетела из Китая",
    text: "Сергей Хорошев рассказал, что Женя собрала вещи и улетела. По его словам, они снова наговорили друг другу много лишнего, между ними накопилось недопонимание, и ситуация получилась печальной.",
    tag: "Участники",
  },

  {
    date: "01.06.2026",
    image: "/news/news-karina-titueva-left-project.jpg",
    title: "Карина Титуева покинула проект Дом-2",
    text: "Участница Дома-2 Карина Титуева покинула телепроект после скандала. Так и не построив любовь на проекте, Карина ушла за периметр.",
    tag: "Участники",
  },

  {
    date: "01.06.2026",
    image: "/news/news-sveta-prel-leon-salibekovy.jpg",
    title: "Светлана Прель переживает за Леончика после ухода Салибековых",
    text: "Светлана Прель высказалась об уходе семьи Салибековых с проекта и заявила, что переживает за Леона. По её словам, история с конфликтом Тиграна, Вики и Карины оказалась правдой, а поведение семьи перешло границы допустимого.",
    tag: "Мнение",
  },

  {
    date: "01.06.2026",
    image: "/news/news-salibekovy-karina-scandal.jpg",
    title: "Салибековы: причина ухода с проекта Дом-2. Скандал с участницей Кариной",
    text: "Появились подробности возможной причины ухода Салибековых с проекта Дом-2. В центре обсуждения — скандал с участницей Кариной, синяки, слёзы и конфликт, который активно обсуждают зрители.",
    tag: "Скандал",
  },

  {
    date: "31.05.2026",
    image: "/news/news-ksusha-zadoynova-recovery.jpg",
    title: "Ксюша Задойнова восстановилась после пластической операции",
    text: "Ксюша Задойнова уже полностью восстановилась после пластической операции и снова выходит на связь с подписчиками.",
    tag: "Участники",
  },
  {
    date: "31.05.2026",
    image: "/news/news-zhenya-horosheva-sergo.jpg",
    title: "Женя Хорошева о харизме с Серго",
    text: "Женя Хорошева считает, что они с Серго не менее харизматичные, чем кое-кто. Зрители уже обсуждают новые кадры с проекта.",
    tag: "Обсуждения",
  },
  {
    date: "31.05.2026",
    image: "/news/news-elina-veronika-lookalike.jpg",
    title: "Элина Рахимова и Вероника — одно лицо?",
    text: "Зрители заметили сходство: Элина Рахимова и Вероника действительно очень похожи. В сети уже обсуждают это сравнение.",
    tag: "Участники",
  },

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

          <nav className="hidden md:flex">
            <div className="flex items-center gap-2 rounded-full bg-white/72 px-2 py-2 text-sm font-black text-slate-900 shadow-lg backdrop-blur-2xl">
              <a href="/#watch" className="rounded-full px-4 py-2 text-slate-700 transition hover:text-slate-900">Эфир</a>
              <a href="/archive" className="rounded-full px-4 py-2 text-slate-700 transition hover:text-slate-900">Предыдущие выпуски</a>
              <a href="/news" className="rounded-full bg-white/90 px-4 py-2 text-slate-950 shadow-md transition hover:-translate-y-0.5 hover:bg-white">Новости</a>
              <a href="https://www.youtube.com/@ThomasKing4771/shorts" target="_blank" rel="noreferrer" className="rounded-full px-4 py-2 text-slate-700 transition hover:text-slate-900">Видео участников</a>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-black text-slate-800/90 drop-shadow-sm sm:inline">Подписывайтесь на</span>
            <a href="https://www.youtube.com/@MaxBrabus" target="_blank" rel="noreferrer" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-700 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
            <a href="https://t.me/maxbrabusstrim" target="_blank" rel="noreferrer" className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-sky-600 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a11.955 11.955 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.365-1.417.155-.479-.148-1.448-.464-2.082-.896-.822-.549-.13-.846.164-1.222.086-.096 1.409-1.292 2.734-2.98.172-.184.282-.428.282-.672V8.94c0-.272-.113-.537-.311-.729l-.034-.035A1.028 1.028 0 0 0 8.9 7.8c-.244.026-.456.126-.628.271-.293.249-.566.585-.756 1.037-.066.16-.108.315-.11.468-.04.923-.1 2.267-.12 3.22-.017.945-.05 2.156-.064 3.08v.382c0 .277.116.543.315.734l.035.035c.278.24.66.318 1.027.259.24-.04.46-.14.628-.271.293-.249.566-.585.757-1.037.065-.16.107-.315.11-.468.04-.923.099-2.267.12-3.22.016-.945.05-2.157.064-3.08z"/></svg>
              Telegram
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-28 md:px-6 md:pb-14 md:pt-32">
        <a href="/" className="mb-6 inline-flex rounded-full border border-white/80 bg-white/86 px-5 py-3 text-sm font-black text-slate-800 shadow-lg backdrop-blur-2xl hover:bg-white">← На главную</a>

        <section className="mb-7 rounded-[2rem] border border-white/80 bg-white/86 p-7 shadow-[0_24px_90px_rgba(15,23,42,0.38)] backdrop-blur-3xl md:p-10">
          <div className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-slate-700">новости проекта</div>
          <h1 className="mb-4 text-4xl font-black text-slate-950 md:text-6xl">Новости Дом 2</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-800">Свежие новости участников, уходы с проекта, конкурсы, семьи и обсуждения зрителей.</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => {
            const tag = item.tag;
            const styles = {
              "Отношения": { glow: "shadow-[0_0_0_2px_rgba(236,72,153,0.7),0_0_18px_rgba(236,72,153,0.45)]", badge: "bg-pink-500 text-white" },
              "Участники": { glow: "shadow-[0_0_0_2px_rgba(56,189,248,0.7),0_0_18px_rgba(56,189,248,0.45)]", badge: "bg-sky-500 text-white" },
              "Скандал":   { glow: "shadow-[0_0_0_2px_rgba(239,68,68,0.7),0_0_18px_rgba(239,68,68,0.45)]", badge: "bg-red-500 text-white" },
              "Семья":     { glow: "shadow-[0_0_0_2px_rgba(34,197,94,0.7),0_0_18px_rgba(34,197,94,0.45)]", badge: "bg-green-500 text-white" },
              "Конкурс":   { glow: "shadow-[0_0_0_2px_rgba(234,179,8,0.7),0_0_18px_rgba(234,179,8,0.45)]", badge: "bg-yellow-400 text-slate-900" },
              "Мнение":    { glow: "shadow-[0_0_0_2px_rgba(139,92,246,0.7),0_0_18px_rgba(139,92,246,0.45)]", badge: "bg-violet-500 text-white" },
              "Обсуждения":{ glow: "shadow-[0_0_0_2px_rgba(249,115,22,0.7),0_0_18px_rgba(249,115,22,0.45)]", badge: "bg-orange-500 text-white" },
            };
            const s = styles[tag] || { glow: "shadow-[0_0_0_2px_rgba(148,163,184,0.5)]", badge: "bg-slate-700 text-white" };
            return (
            <a key={item.title} href={item.href || "/news"} className="block text-inherit no-underline">
              <article className={`group overflow-hidden rounded-[2rem] border border-white/80 bg-white/86 p-4 backdrop-blur-3xl transition-all duration-300 md:hover:-translate-y-2 md:hover:scale-[1.025] ${s.glow}`}>
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-lg">
                <img src={item.image} alt={item.title} className="aspect-[4/5] w-full object-cover object-center transition-transform duration-300 md:group-hover:scale-105" />
                <div className={`absolute left-4 top-4 rounded-full px-4 py-2 text-sm font-black shadow-lg backdrop-blur-xl ${s.badge}`}>{item.tag}</div>
                <div className="absolute right-4 top-4 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg">{item.date}</div>
              </div>
              <div className="p-3">
                <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-700">публикация от {item.date}</div>
                <h2 className="mb-3 text-xl font-black leading-snug text-slate-950">{item.title}</h2>
                <p className="text-sm leading-6 text-slate-800">{item.text}</p>
              </div>
              </article>
            </a>
            );
          })}
        </section>
      </div>
    </main>
  );
}
