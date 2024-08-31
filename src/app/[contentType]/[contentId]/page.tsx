import { getPageContent } from "@/notion";
import React from "react";

const ContentPage = async ({ params }: { params: { contentId: string } }) => {
  const { contentId } = params;
  const content = await getPageContent({ id: contentId });

  return (
    <div
      className="markdown-content space-y-4 mb-8"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default ContentPage;
