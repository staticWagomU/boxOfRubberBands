import { visit } from "unist-util-visit";
import * as budoux from "budoux";

export default function remarkBudoux() {
	const parser = budoux.loadDefaultJapaneseParser();
	return (tree) => {
		visit(tree, 'text', (node) => {
			if (node.value.trim()) {
				node.value = parser.translateHTMLString(node.value);
				node.type = 'html';
			}
		});
	};
}
