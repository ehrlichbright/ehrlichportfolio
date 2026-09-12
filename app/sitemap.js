import { siteUrl, work } from "@/content/site";

export default function sitemap() {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, priority: 1 },
    { url: `${siteUrl}/story`, lastModified: now, priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified: now, priority: 0.6 },
    ...work.map((w) => ({
      url: `${siteUrl}/work/${w.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
