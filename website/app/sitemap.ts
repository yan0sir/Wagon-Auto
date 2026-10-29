import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const paths = ["", "/about", "/services", "/partners", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}/en${path}`,
    alternates: { languages: { en: `${site.url}/en${path}`, ar: `${site.url}/ar${path}` } },
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
