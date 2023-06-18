import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import vercelStatic from "@astrojs/vercel/static";

const site = import.meta.env.DEV
  ? "http://localhost:8000"
  : "https://blog.minjong.codes";

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: "never",
  integrations: [
    mdx(),
    react(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      filter: (page) => !page.includes("/resume"),
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "dark-plus",
    },
  },
  output: "static",
  adapter: vercelStatic(),
});
