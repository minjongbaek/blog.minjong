import { getContent } from "@/notion";

const ContentPage = async ({ params }: { params: { contentId: string } }) => {
  const { contentId } = params;
  const content = await getContent({ id: contentId });

  return <div dangerouslySetInnerHTML={{__html: content}}></div>;
};

export default ContentPage;
