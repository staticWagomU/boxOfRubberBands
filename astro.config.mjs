import { defineConfig } from "astro/config";
import remarkBreaks from "remark-breaks";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import codeBlockPlugin from "./tools/remark-code-quote";
import wrapH2WithSection from "./tools/rehype-wrap-h2-with-section";
import { astroLastModifiedAt } from "./tools/remark-astro-last-modified-at";

// https://astro.build/config
export default defineConfig({
  // site: 'https://example.com',
  site: "https://wagomu.me",
  integrations: [mdx(), sitemap(), tailwind()],
  vite: {
    plugins: []
  },
  markdown: {
		remarkPlugins: [remarkBreaks, codeBlockPlugin, astroLastModifiedAt],
    rehypePlugins: [wrapH2WithSection],
    shikiConfig: {
      theme: "github-light"
    }
  }
});
