export default async function Page({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;
  try {
    const { default: Post, metadata } = await import(
      `@/contents/${type}/${slug}/index.mdx`
    );

    return (
      <div className="flex flex-col items-center gap-4 mt-6 mb-10">
        <h1 className="text-2xl font-bold text-center break-keep">
          {metadata.title}
        </h1>
        <div className="text-slate-500">
          {new Date(metadata.createdAt).toLocaleDateString("ko-KR")}
        </div>
        {metadata.tags && (
          <div className="flex gap-4">
            {metadata.tags.map((tag: string) => (
              <span key={tag} className="text-orange-500">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="markdown-content space-y-4 mb-8">
          <Post />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Not found</div>;
  }
}
