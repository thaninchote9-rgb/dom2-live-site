export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://dom2-live.ru/sitemap.xml",
    host: "https://dom2-live.ru",
  };
}
