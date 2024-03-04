import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import { SITE_URL } from "./src/config";

const site = import.meta.env.DEV ? "http://localhost:8000" : SITE_URL;

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
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
});
