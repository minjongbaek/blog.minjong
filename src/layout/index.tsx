import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
