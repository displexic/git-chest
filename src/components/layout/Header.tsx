const Header = () => {
  return (
    <>
      <div className="relative h-14 w-full"></div>
      <div className="fixed z-40 justify-between flex top-0 left-14 right-0 h-14 border-b border-border bg-bg-tertiary/60 backdrop-blur-md">
        <div></div>
        <div className="flex mt-1 ml-3">
          <p className="text-2xl text-fg-secondary font-nunito-sans ml-3 mt-1.5 translate-y-px">
            Git Chest
          </p>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Header;
