import { defineConfig } from "astro/config";
import remarkBreaks from "remark-breaks";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";


// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import wrapH2WithSection from "./tools/rehype-wrap-h2-with-section";

// https://astro.build/config
export default defineConfig({
  // site: 'https://example.com',
  site: "https://wagomu.me",
  integrations: [mdx(), sitemap(), tailwind()],
  vite: {
    plugins: []
  },
  markdown: {
    remarkPlugins: [remarkBreaks],
    rehypePlugins: [wrapH2WithSection],
    shikiConfig: {
      theme: "github-light"
    }
  }
});
