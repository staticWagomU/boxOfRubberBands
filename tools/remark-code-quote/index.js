import { visit } from "unist-util-visit";

export default function codeBlockPlugin() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.meta) {
        const titleMatch = node.meta.match(/title=["']([^"']*)["']/);
        const title = titleMatch ? titleMatch[1] : "";
        const codeBlockWithTitle = {
          type: "html",
          value: createCodeBlockWithTitle(node.lang, title, node.value)
        };
        parent.children.splice(index, 1, codeBlockWithTitle);
      }
    });
  };
}

function createCodeBlockWithTitle(lang, title, code) {
  const titleElement = title 
    ? `<div class="code-block-title">${title}</div>`
    : '';
  
  return `
<div class="code-block-with-title">
  ${titleElement}
  <pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>
</div>
`;
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
