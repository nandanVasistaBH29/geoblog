import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { async } from "@firebase/util";
export default function Login() {
  const [user, loading] = useAuthState(auth);

  const route = useRouter();
  //with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // route.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  // // with FB
  // const fbProvider = new FacebookAuthProvider();
  // const facebookProvider = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, facebookProvider);
  //     route.push("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <>
      <Header />
      {user ? (
        <div className="mx-auto flex-col justify-center items-start">
          <h1 className="text-3xl  text-orange-800">Already Logged in</h1>
          <h3>If you wish to log out </h3>
          <button
            className="block cursor-pointer border border-orange-600 rounded-lg text-orange-600 p-2"
            onClick={() => auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="shadow-xl mt-32 p-10 text-grey-700 rounded-lg max-w-7xl ">
          <h2 className="text-3xl font-medium text-orange-500">
            Login In To GeoBlog
          </h2>
          <div className="py-4">
            <h3 className="py-4">
              Enjoy Unlimited Educational Content For{" "}
              <span className="text-green-600 font-bold">Free</span>
            </h3>
          </div>
          <div className="flex items-center gap-4 cursor-pointer">
            <button onClick={googleLogin}>
              <span>
                <FcGoogle className="text-5xl md:text-6xl lg:text-7xl" />
              </span>
              Sign in with Google
            </button>
          </div>
          <br />
          {/* <div className="flex items-center gap-4 cursor-pointer">
            <button>
              <span>
                <AiFillFacebook className="text-5xl md:text-6xl lg:text-7xl text-blue-500" />
              </span>{" "}
              Sign in with FaceBook
            </button>
          </div> */}
        </div>
      )}
    </>
  );
}
