import { Link } from 'gatsby';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <h1 className="text-6xl">404</h1>
      <h2 className="text-2xl">페이지를 찾을 수 없습니다.</h2>
      <Link className="text-sky-500" to="/">
        홈으로
      </Link>
    </div>
  );
};

export default NotFoundPage;
