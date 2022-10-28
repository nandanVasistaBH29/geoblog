import Link from "next/link";

const Header = () => {
  return (
    <header className="py-5 px-5 flex justify-between max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link className="w-44 object-contain cursor-pointer" href="/">
          GeoBlog
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-orange-600 px-4 py-1 rounded-full">
            Follow
          </h3>
        </div>
      </div>

      {/* sign in part */}
      <div className="flex items-center space-x-5 text-orange-600">
        <h3>Sign in</h3>
        <h3 className="border px-4 py-1 rounded-full border-orange-600">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
