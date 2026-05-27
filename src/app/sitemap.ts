import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phpropertiesonline.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${SITE_URL}/#properties`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${SITE_URL}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${SITE_URL}/#testimonials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${SITE_URL}/#faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${SITE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
