import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.minjongdev.com",
  integrations: [
    mdx(),
    react(),
    tailwind(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "monokai",
    },
  },
});
