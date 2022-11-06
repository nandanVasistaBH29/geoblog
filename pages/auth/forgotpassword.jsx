import { useState } from "react";
import axios from "axios";
import Link from "next/link";
//firebase
import { useRouter } from "next/router";
import { auth } from "../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Header from "../../components/Header";

const Forgot_password = () => {
  const route = useRouter();
  // traking form inputs using useState
  const [inputs, setInputs] = useState({
    email: "",
    otp: "",
    password: "",
    phone: "",
  });
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
      })
      .catch((err) => {
        console.dir(err);
      });
  };
  const verifyOtp = (otp) => {
    if (otp.length === 6) {
      // console.log(otp);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          // call for backend
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const getOtp = (e) => {
    e.preventDefault();
    if (inputs.phone.length >= 12) {
      loginWithPhoneNumber(inputs.phone);
    } else {
      setErrorMesssages((prev) => ({ ...prev, phoneNumberLength: true }));
    }
  };
  const resetPassword = (e) => {
    e.preventDefault();
    // verify OTP
    try {
      verifyOtp(inputs.otp);
      updatePassword();
      route.push("/auth/login");
    } catch (err) {
      return;
    }
    updatePassword();
  };
  const updatePassword = async () => {
    const data = {
      email: inputs.email,
      password: inputs.password,
      phone: inputs.phone,
    };
    const res = await axios.put("/api/auth/user-forgot-password", data);
  };
  return (
    <>
      <Header />
      <div className="mt-20 pt-2 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Registered email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={inputs.email}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Registered Number With
                <span className="text-bold">Country code</span>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={inputs.phone}
                onChange={(e) => handleChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="+9193534"
                required
              />
            </div>
            <div>
              <button
                id="sign-in-button" //id is imp for recaptha
                onClick={() => loginWithPhoneNumber(inputs.phone)}
                className="p-2 m-2 font-semibold text-orange-500 border border-orange-200 rounded-lg"
              >
                Get Otp
              </button>
              <div className=" mb-4">
                <label
                  htmlFor="otp"
                  className="leading-7 text-sm text-gray-600"
                >
                  OTP
                </label>
                <input
                  type="number"
                  name="otp"
                  value={inputs.otp}
                  onChange={(e) => handleChange(e)}
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
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={inputs.password}
                onChange={(e) => handleChange(e)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={resetPassword}
              className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgot_password;
