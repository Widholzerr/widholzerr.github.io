import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://widholzerr.github.io",
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [sitemap()],
});
