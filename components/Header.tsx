import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { MdNotificationsActive } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
const Header = () => {
  const [user, loading] = useAuthState(auth);
  const [perm, setPerm] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const handleClick = () => {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        setPerm(true);
        setShowMsg(true);
        const nofif = new Notification("Following", {
          data: `Hi ${user?.displayName}`,
          body: "Thanks For Following Us Pal, Appretiate it",
        });
        nofif.addEventListener("close", (e) => {
          console.log(e);
        });
      } else {
        setPerm(false);
        setShowMsg(true);
      }
    });
  };
  return (
    <>
      <header className="py-5 px-5 flex justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-5">
          <Link
            className="text-3xl w-44 object-contain cursor-pointer"
            href="/"
          >
            GeoBlog
          </Link>
          <div className="hidden md:inline-flex items-center space-x-5">
            <Link href={"/about"}>
              <h3>About</h3>
            </Link>
            <Link href={"/contact"}>
              <h3>Contact</h3>
            </Link>
            <div onClick={handleClick}>
              <h3 className="text-white bg-orange-600 px-4 py-1 rounded-full flex items-center cursor-pointer">
                Follow
                <MdNotificationsActive className="inline cursor-pointer" />
              </h3>
            </div>
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
                Get Started
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
      {perm === true && showMsg === true && (
        <div className="bg-green-100 flex items-center justify-around text-green-800 text-normal text-center font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
          <h4>
            Thanks For Following Us. Our Team Will Mail You Once A New Post Is
            Sent
          </h4>
          <button onClick={() => setShowMsg(false)}>
            <AiFillCloseCircle className="text-orange-400" />
          </button>
        </div>
      )}
      {perm === false && showMsg === true && (
        <div className="bg-red-100 flex items-center justify-around text-red-600 text-normal text-center font-semibold mr-2 px-2.5 py-0.5 rounded">
          <h4>access denied</h4>
          <button onClick={() => setShowMsg(false)}>
            <AiFillCloseCircle className="text-orange-500" />
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
