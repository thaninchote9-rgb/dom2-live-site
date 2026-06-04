export default function sitemap() {
  const baseUrl = "https://dom2-live.ru";
  const routes = [
    "",
    "/dom-2-smotret-online",
    "/dom-2-svezhie-serii",
    "/dom-2-segodnya",
    "/dom-2-efir",
    "/dom-2-arhiv",
    "/novosti",
    "/archive",
    "/news",
    "/dom-2-segodnyashniy-vypusk",
    "/dom-2-smotret-online-besplatno",
    "/dom-2-svezhie-serii-smotret-besplatno",
    "/dom-2-efir-smotret-online",
    "/dom-2-smotret-2026",
    "/dom-2-smotret-v-horoshem-kachestve",
  ];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
