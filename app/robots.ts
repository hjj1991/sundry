import type { MetadataRoute } from "next";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://sundry.ninja/sitemap.xml",
    host: "https://sundry.ninja",
  };
}
