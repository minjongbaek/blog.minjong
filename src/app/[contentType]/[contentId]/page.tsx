import { getPageContent, getPageProperty } from "@/notion";
import React from "react";

const ContentPage = async ({ params }: { params: { contentId: string } }) => {
  const { contentId } = params;
  const { title, tags, createdAt } = await getPageProperty({
    id: contentId,
  });
  const content = await getPageContent({ id: contentId });

  return (
    <div className="flex flex-col items-center gap-4 mt-6 mb-10">
      <h1 className="text-2xl font-bold text-center break-keep">{title}</h1>
      <div className="text-slate-500">
        {new Date(createdAt).toLocaleDateString("ko-KR")}
      </div>
      {tags && (
        <div className="flex gap-4">
          {tags.map((tag) => (
            <span key={tag} className="text-orange-500">
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div
        className="markdown-content space-y-4 mb-8"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default ContentPage;