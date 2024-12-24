import { defineConfig } from "astro/config";
import remarkBreaks from "remark-breaks";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import codeBlockPlugin from "./tools/remark-code-quote";
import wrapH2WithSection from "./tools/rehype-wrap-h2-with-section";
import astroLastModifiedAt from "./tools/remark-astro-last-modified-at";
import remarkBudoux from "./tools/remark-budoux";
import rehypeLineNumbers from "./tools/rehype-line-numbers";

import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
	site: "https://wagomu.me",
	build: {
		format: "file",
	},
	integrations: [
		mdx(),
		sitemap(),
		(await import("@playform/compress")).default({
			CSS: false,
			HTML: false,
			Image: false,
			JavaScript: true,
			SVG: true,
			Logger: 1,
		}),
		(await import("@playform/inline")).default(),
		compressor(),
	],
	trailingSlash: "never",
	vite: {
		plugins: [],
	},
	markdown: {
		remarkRehype: {
			footnoteLabelTagName: "hr",
			footnoteLabel: " ",
		},
		remarkPlugins: [remarkBreaks, astroLastModifiedAt, remarkBudoux, codeBlockPlugin],
		rehypePlugins: [wrapH2WithSection, rehypeLineNumbers],
		shikiConfig: {
			defaultColor: false,
			themes: {
				light: "everforest-light",
				dark: "everforest-dark",
			},
			wrap: false,
		},
	},
	experimental: {
		svg: true,
	},
});
