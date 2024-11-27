import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";

/**
 * Rehypeプラグイン: コードブロックに行番号を追加
 * @param {object} options - プラグインのオプション
 * @param {boolean} options.startFrom1 - 行番号を1から開始するかどうか (デフォルト: true)
 * @param {string} options.className - 行番号用のCSSクラス名 (デフォルト: 'line-number')
 * @param {string} options.wrapperClassName - コードブロックのラッパー要素のCSSクラス名 (デフォルト: 'code-block-wrapper')
 * @returns {function} Unified/Rehypeトランスフォーマー
 */
export default function rehypeLineNumbers(options = {}) {
	const {
		startFrom1 = true,
		className = "line-number",
		wrapperClassName = "code-block-wrapper",
	} = options;

	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			if (node.tagName !== "pre" || !node.children?.[0]?.tagName === "code") {
				return;
			}

			const codeNode = node.children[0];

			// hast-util-to-stringを使用して安全にテキストを抽出
			const code = toString(codeNode);
			// 空の行を保持しながら分割
			const lines = code.split(/\r?\n/);
			const startNumber = startFrom1 ? 1 : 0;

			// 行番号要素の作成
			const lineNumbers = {
				type: "element",
				tagName: "div",
				properties: {
					className: [className],
				},
				children: lines.map((_, i) => ({
					type: "element",
					tagName: "span",
					properties: {
						className: [`${className}-item`],
						"data-line-number": startNumber + i,
					},
					children: [
						{
							type: "text",
							value: String(startNumber + i),
						},
					],
				})),
			};

			// コードコンテンツをdiv要素でラップ
			const codeWrapper = {
				type: "element",
				tagName: "div",
				properties: {
					className: ["code-content"],
				},
				children: [node],
			};

			// メインラッパーの作成
			const wrapper = {
				type: "element",
				tagName: "div",
				properties: {
					className: [wrapperClassName],
				},
				children: [lineNumbers, codeWrapper],
			};

			// 親ノードの子要素を更新
			if (parent) {
				parent.children[index] = wrapper;
			}
		});
	};
}
