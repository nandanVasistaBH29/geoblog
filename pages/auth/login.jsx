import { FcGoogle } from "react-icons/fc";
import Header from "../../components/Header";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Login() {
  const generateRecaptcha = () => {
    // creating a global variable
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button", // this is the id of the btn which triggers it
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  const loginWithPhoneNumber = (phone) => {
    generateRecaptcha();

    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((res) => {
        // console.log(res);
        window.confirmationResult = res;
        checkInDb(phone);
      })
      .catch((err) => {
        console.dir(err);
      });
  };
  const verifyOtp = (otp) => {
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };
  const checkInDb = async (phoneOrEmail, password) => {
    try {
      const res = await axios.post("/api/auth/login", {
        phoneOrEmail,
        password,
      });
      const data = res.data;
      while (typeof window === "undefined") {}
      if (localStorage.getItem("geoblog-mail")) {
        localStorage.removeItem("geoblog-mail"); // same device can be used by 2 diff accounts
      }
      localStorage.setItem(
        "geoblog-mail",
        JSON.stringify({
          email: data.email,
          displayName: data.displayName,
          photoURL: data.photoURL,
        })
      );
      // route.push("/");
    } catch (err) {
      console.log("====================================");
      console.log(err);
      route.push("/auth/register");
      console.log("====================================");
    }
  };

  const [user, loading] = useAuthState(auth);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const route = useRouter();
  //with google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      checkInDb(email);
      route.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  // with email and password
  const handleLoginWithEmailAndPassword = () => {
    checkInDb(email, password);
  };

  return (
    <div className="mx-auto">
      <Header />
      <Link
        className=" mt-2 text-semibold text-center text-orange-400"
        href={"/auth/register"}
      >
        <h2>Don't have an account Please Register first - click here</h2>
      </Link>
      {user ? (
        <div className="mx-auto flex-col justify-center items-center ">
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
        <div className="flex flex-col justify-center items-center px-2 md:flex-row">
          {/* google */}
          <div className="shadow-xl mt-16 p-4 text-grey-700 rounded-lg max-w-7xl ">
            <h2 className="text-3xl font-medium text-orange-500">
              Login In To GeoBlog
            </h2>
            <div className="py-4">
              <h3 className="py-4">
                Enjoy Unlimited Educational Content For
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
          </div>

          {/*  vertical line */}
          <div className="border-orange-600 border-t-4 md:border-l-4 "></div>
          {/* otp */}
          <div className="shadow-xl mt-16 p-4 text-grey-700 rounded-lg max-w-7xl">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Login With Phone number and OTP
            </h2>
            <p className="leading-relaxed mb-5 text-sm text-gray-600">
              -No need to remember the password
            </p>
            <div className=" mb-4">
              <label
                htmlFor="Phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone With Country Code(+91,+1)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              id="sign-in-button"
              onClick={() => loginWithPhoneNumber(phone)}
              className="p-2 m-2 font-semibold text-orange-500 border border-orange-200 rounded-lg"
            >
              Get Otp
            </button>
            <div className=" mb-4">
              <label htmlFor="otp" className="leading-7 text-sm text-gray-600">
                OTP
              </label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              id="sign-in-button"
              onClick={() => verifyOtp(otp)}
              className="p-2 m-2 font-semibold text-orange-500 border border-orange-200 rounded-lg"
            >
              Verify
            </button>
          </div>
          <div className="border-orange-600 border-t-4 md:border-l-4 "></div>
          {/* otp */}
          <div className="shadow-xl mt-16 p-4 text-grey-700 rounded-lg max-w-7xl">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Login With Email and password
            </h2>
            <Link
              href="/auth/forgotpassword"
              className="leading-relaxed mb-5 text-sm text-orange-600"
            >
              Forgot Password
            </Link>
            <div className=" mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Enter Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className=" mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Enter Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              onClick={handleLoginWithEmailAndPassword}
              className="p-2 m-2 font-semibold text-orange-500 border border-orange-200 rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
