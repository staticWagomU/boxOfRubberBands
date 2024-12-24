import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas"

const collectionEntries = await getCollection("daily");

const pages = process.env.SKIP_OG
	? []
	: Object.fromEntries(collectionEntries.map(({ id, data }) => [id, data]));


export const { getStaticPaths, GET } = OGImageRoute({
	param: "path",
	pages,
	getImageOptions: (_, page) => {
		return {
			title: ` ${page.pubDate.getMonth()}/${page.pubDate.getDate()}のにっき`,
			bgImage: {
				path: "./public/OGP/daily.png",
				fit: "cover",
			},
			font: {
				title: {
					size: 160,
					color: [51, 51, 51],
					families: ["Cherry Bomb One"],
					lineHeight: 2.3,
				},
			},
			fonts: [
				"./src/pages/daily/_fonts/Cherry_Bomb_One/CherryBombOne-Regular.ttf",
			],
		};
	}
});
