const Header = () => {
  return (
    <header className="sticky top-0 bg-white z-20 border-b-2 mb-2">
      <div className="px-6 py-3 flex justify-between">
        <a href="/">
          <h1 className="font-semibold text-xl cursor-pointer select-none">
            Blog.minjongdev
          </h1>
        </a>
        <div>
          <a href="/tags">
            <h1 className="font-semibold cursor-pointer select-none">Tags</h1>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
