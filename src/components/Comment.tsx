import { useRef, useEffect } from "react";

type UtterancesAttributesType = {
  src: string;
  repo: string;
  "issue-term": string;
  label: string;
  theme: string;
  crossorigin: string;
  async: string;
};

const Comment = () => {
  const divElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divElement.current === null) return;

    const utterances: HTMLScriptElement = document.createElement("script");

    const attributes: UtterancesAttributesType = {
      src: "https://utteranc.es/client.js",
      repo: "minjongbaek/blog.minjongdev",
      "issue-term": "title",
      label: "comment",
      theme: `github-light`,
      crossorigin: "anonymous",
      async: "true",
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    divElement.current.appendChild(utterances);
  }, [divElement]);

  return <div ref={divElement} />;
};

export default Comment;
