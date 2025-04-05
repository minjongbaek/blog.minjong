import createMDX from "@next/mdx";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";

const remarkPublicImage = () => {
  const updateImageUrl = (node, directory) => {
    if (node.type === "image") {
      node.url = `/images/content/${directory}/${node.url}`;
    }
  };

  const visitNode = (node, directory) => {
    updateImageUrl(node, directory);
    if (node.children) {
      node.children.forEach((child) => visitNode(child, directory));
    }
  };

  return (tree, file) => {
    const directory = file.history[0]
      .split("/")
      .slice(-3)
      .slice(0, 2)
      .join("/");

    tree.children.forEach((node) => visitNode(node, directory));
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkPublicImage],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          themes: {
            light: "vitesse-light",
            dark: "vitesse-dark",
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
