type PostDetailProps = {
  html: string;
};

const PostDetail = ({ html }: PostDetailProps) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default PostDetail;
