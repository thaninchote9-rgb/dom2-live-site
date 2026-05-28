export default function sitemap() {
  const baseUrl = "https://dom2-live.ru";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
