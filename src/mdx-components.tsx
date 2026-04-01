import MdxLink from "@/components/MdxLink";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: MdxLink,
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        alt={props.alt}
        loading="lazy"
        decoding="async"
        style={{ width: "100%", height: "auto" }}
      />
    ),
  };
}
