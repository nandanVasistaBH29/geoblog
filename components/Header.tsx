import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
const Header = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <header className="py-5 px-5 flex justify-between max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link className="text-3xl w-44 object-contain cursor-pointer" href="/">
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
        {!user ? (
          <>
            <Link href={"/auth/login"}>
              <h3>Sign in</h3>
            </Link>
            <h3 className="border px-4 py-1 rounded-full border-orange-600">
              Get Started With Us
            </h3>
          </>
        ) : (
          <>
            <div className="flex flex-row-reverse items-center space-x-5 text-orange-600">
              <Link href="/dashboard">
                <img
                  src={user.photoURL!}
                  className="rounded-full w-12 mx-2 md:mx-4 lg:mx-8"
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <h3 className="border px-4 py-1 rounded-full border-orange-600">
                Hi {user.displayName}
              </h3>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
