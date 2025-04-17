import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: (props) => (
      <Image
        {...props}
        alt={props.alt}
        width={640}
        height={400}
        style={{ width: "100%", height: "auto" }}
      />
    ),
  };
}
