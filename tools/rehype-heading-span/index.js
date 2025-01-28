import { visit } from "unist-util-visit";

export default function rehypeHeadingSpan() {
	return function transformer(tree) {
		visit(tree, "element", (node) => {
			if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
				node.children = [
					{
						type: "element",
						tagName: "span",
						properties: {},
						children: node.children,
					},
				];
			}
		});
	};
}
