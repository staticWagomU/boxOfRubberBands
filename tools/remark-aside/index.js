import { visit } from "unist-util-visit";

export default function remarkAside() {
	return function transformer(tree) {
		visit(tree, "text", (node, index, parent) => {
			const value = node.value;
			const reg = /^:::\s*(\w+)[\s\S]*?\r?\n([\s\S]*?)\r?\n:::/;
			const match = value.match(reg);
			if (!match) {
				return;
			}
			const type = match[1];
			const content = match[2];
			const start = node.position.start;
			const end = node.position.end;
			const aside = {
				type: "container",
				children: [
					{
						type: "container",
						children: [
							{
								type: "container",
								children: [],
								data: {
									hName: "span",
									hProperties: { className: ["icon"] },
								},
							},
							{
								type: "text",
								value: getType(type),
							},
						],
						data: {
							hName: "div",
							hProperties: { className: ["aside-title"] },
						},
					},
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: content,
							},
						],
						data: { hProperties: { className: ["aside-content"] } },
					},
				],
				data: {
					hName: "aside",
					hProperties: { className: ["directive", type.toLowerCase()] },
				},
				position: {
					start,
					end,
				},
			};

			parent.children.splice(index, 1, aside);
		});
	};
}

function getType(type) {
	switch (type.toLowerCase()) {
		case "tips":
			return "ヒント";
		case "warning":
			return "警告";
		case "note":
			return "注意";
		case "info":
			return "情報";
		default:
			return type;
	}
}
