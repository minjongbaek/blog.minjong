type PostDetailProps = {
  html: string;
};

const PostDetail = ({ html }: PostDetailProps) => {
  return (
    <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default PostDetail;
