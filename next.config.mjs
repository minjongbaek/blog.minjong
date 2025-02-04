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

  webpack: (config) => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
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
