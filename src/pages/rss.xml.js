import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection("blog");

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    // items: await pagesGlobToRssItems(import.meta.glob("./blog/*.mdx")),
    items: blog.map((post) => ({
      link: `/blog/${post.slug}/`,
      // 注: MDXファイルのコンポーネントやJSX式は処理されません。
      content: sanitizeHtml(parser.render(post.body)),
      ...post.data,
    })),
  });
}
