import createMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const remarkPublicImage = () => {
  const updateImageUrl = (node, directory) => {
    if (node.type === "image") {
      const url = node.url.replace(/\.png$/, ".webp");
      node.url = `/images/content/${directory}/${url}`;
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
  output: "export",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkPublicImage],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
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
