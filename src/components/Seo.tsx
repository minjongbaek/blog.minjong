type SeoProps = {
  title: string;
  description: string;
  url: string;
};

const Seo = ({ title, description, url }: SeoProps) => {
  const image = 'https://blog.minjongdev.com/open-graph.png';
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
    </>
  );
};

export default Seo;
