import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  title: string;
  description: string;
  url: string;
};

const Layout = ({
  title,
  description,
  url,
  children,
}: LayoutProps & PropsWithChildren) => {
  const image = 'https://blog.minjongdev.com/open-graph.png';

  return (
    <div className="min-h-screen">
      <Helmet>
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
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 max-w-4xl">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
