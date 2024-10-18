export default function wrapH2WithSection() {
  return (tree) => {
    const sections = [];
    let currentSection = null;

    tree.children.forEach((node) => {
      if (node.type === "element" && node.tagName === "h2") {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          type: "element",
          tagName: "section",
          properties: { className: ["section"] },
          children: [node],
        };
      } else if (currentSection) {
        currentSection.children.push(node);
      } else {
        sections.push(node);
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }

    tree.children = sections;
  };
}
