const Header = () => {
  return (
    <header className="sticky top-0 bg-white z-20 border-b-2 mb-2">
      <div className="p-4 flex justify-center">
        <a href="/">
          <h1 className="font-extrabold text-2xl cursor-pointer select-none">
            Blog.minjongdev
          </h1>
        </a>
      </div>
    </header>
  );
};

export default Header;