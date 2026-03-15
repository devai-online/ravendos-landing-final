import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `https://ravendos.com/services/${service.slug}`,
    lastModified: new Date("2025-03-15"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://ravendos.com",
      lastModified: new Date("2025-03-15"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://ravendos.com/services",
      lastModified: new Date("2025-03-15"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages,
    {
      url: "https://ravendos.com/contact",
      lastModified: new Date("2025-03-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
