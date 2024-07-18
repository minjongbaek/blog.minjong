import { getContent } from "@/notion";

const ContentPage = async ({ params }: { params: { contentId: string } }) => {
  const { contentId } = params;
  const contents = await getContent({ id: contentId });

  return <div>{JSON.stringify(contents)}</div>;
};

export default ContentPage;
