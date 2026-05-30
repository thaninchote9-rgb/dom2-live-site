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
  ];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
