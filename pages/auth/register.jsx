import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import axios from "axios";
import { useRouter } from "next/router";
const Register = () => {
  const route = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    photoURL: "",
    displayName: "",
  });
  const [errors, setErrors] = useState({
    phoneErr: "",
    passwordErr: "",
  });
  const register = async (e) => {
    e.preventDefault();
    setErrors({
      phoneErr: "",
      passwordErr: "",
    });
    if (inputs.phone.length < 12) {
      setErrors({ ...errors, phoneErr: "Phone number length >=12" });
      return;
    }
    if (inputs.confirmpassword !== inputs.password) {
      setErrors({ ...errors, passwordErr: "passwords do not match" });
      return;
    }
    try {
      const res = await axios.post("/api/auth/register", inputs);
      console.log(res);
      if (localStorage.getItem("geoblog-mail")) {
        localStorage.removeItem("geoblog-mail"); // same device can be used by 2 diff accounts
      }
      localStorage.setItem(
        "geoblog-mail",
        JSON.stringify({
          email: inputs.email,
          displayName: inputs.displayName,
          photoURL: inputs.photoURL,
        })
      );
      route.push("/");
    } catch (err) {
      console.log(err);
      route.push("/auth/login");
    }
  };
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  function handleFileChange(id, e) {
    const fileInput = document.getElementById(id);
    if (fileInput.files.length > 0) {
      const fileSize = fileInput.files.item(0).size;
      const fileMb = fileSize / 1024 ** 2;
      if (fileMb > 2)
        alert(
          "the uploaded file size is " + fileMb + " should be less than 2MB"
        );
      else {
        handleChange(e);
      }
    }
  }
  return (
    <div className=" ">
      <Header />
      <div className="mx-auto flex-col justify-center items-center shadow-xl mt-16 p-4 text-grey-700 rounded-lg max-w-7xl">
        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
          Start Your journey in this{" "}
          <span className="text-pink-500">Family</span>
        </h2>
        <Link
          href="/auth/login"
          className="leading-relaxed mb-5 text-sm text-orange-600"
        >
          Already a Family member - Login
        </Link>
        <form>
          <div className=" mb-4">
            <label
              htmlFor="displayName"
              className="leading-7 text-sm text-gray-600"
            >
              Enter Name
            </label>
            <input
              required
              type="text"
              name="displayName"
              value={inputs.displayName}
              onChange={(e) => handleChange(e)}
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Enter Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={inputs.email}
              onChange={(e) => handleChange(e)}
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
              required
              type="password"
              name="password"
              value={inputs.password}
              onChange={(e) => handleChange(e)}
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className=" mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              required
              type="password"
              name="confirmpassword"
              value={inputs.confirmpassword}
              onChange={(e) => handleChange(e)}
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className=" mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Enter Phone With
              <span className="text-bold">countycode no spaces</span>
            </label>
            <input
              required
              type="text"
              name="phone"
              value={inputs.phone}
              onChange={(e) => handleChange(e)}
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <div className=" mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Enter Your Pic
              </label>
              <input
                required
                type="file"
                name="photoURL"
                id="pic"
                value={inputs.photoURL}
                onChange={(e) => {
                  handleFileChange("pic", e);
                }}
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={(e) => register(e)}
              className="p-2 m-2 font-semibold text-pink-500 border border-orange-200 rounded-lg hover:bg-pink-400 hover:text-white"
            >
              Welcome To Family
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
