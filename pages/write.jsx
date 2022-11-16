import dynamic from "next/dynamic";
import { useState } from "react";
import Header from "../components/Header";
import "react-quill/dist/quill.snow.css";
import slugify from "slugify";
import axios from "axios";
import Link from "next/link";

const modules = {
  toolbar: [
    [
      { header: "1" },
      { header: "2" },
      { font: ["monospace", "sans-serif", "serif"] },
    ],
    [{ size: ["16px"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    // ["link","image"], // CAN ADD "image"
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
];

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const Write = () => {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [uid, setUid] = useState();
  const [access, setAccess] = useState(false);
  const [error, setError] = useState(false);
  const verifyEmail = async () => {
    setAccess(false);
    setError(false);
    try {
      const res = await axios.post("/api/auth/verify-access", {
        email: email,
        access: "2",
      });
      if (!res.data.error) {
        setAccess(true);
        setUid(res.data.uid[0].id);
        return;
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  const getSlug = () => {
    if (title !== "") {
      setSlug(slugify(title));
    }
  };
  const postIt = async () => {
    try {
      if (!email || !title || !value || !slug || !uid) {
        alert("enter email,title and then get a slug and write content");
        return;
      }
      console.log(value);
      const res = await axios.post("api/articles/add-blog", {
        title,
        description: body.slice(0, 20),
        body: value,
        slug,
        categories: null,
        uid,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Header />
      <div className="m-3 p-3 md:m-5 md:p-5">
        <div className="flex">
          <label>
            <h3>First Enter Your Email</h3>
          </label>
          <input
            type="email"
            className="w-full p-2 m-2  border-orange-300"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setAccess(false);
              setEmail(e.target.value);
            }}
          />
          <button
            onClick={verifyEmail}
            className="bg-green-400 p-2 rounded-lg text-white"
          >
            Verify
          </button>
        </div>
        <div className="flex mt-2">
          <label>
            <h3> Enter Title for blog</h3>
          </label>
          <input
            type="text"
            className="w-full p-2 m-2 border-orange-300"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={getSlug}
            className="bg-green-400 p-2 rounded-lg text-white"
          >
            Get Slug
          </button>
        </div>
        {slug !== "" && (
          <div className="bg-green-100 text-center p-1 m-1">slug : {slug}</div>
        )}

        <div className="mt-5 flex gap-5">
          <div className="">
            <QuillNoSSRWrapper
              modules={modules}
              formats={formats}
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="create your main content"
            />
          </div>
        </div>
        {access && !error && (
          <button
            onClick={postIt}
            className="text-xl md:text-3xl text-orange-500 bg-orange-100 p-3 m-3 rounded-xl"
          >
            Post
          </button>
        )}
        {error && (
          <>
            <div className="bg-red-200 text-red-800 p-2 m-2 rounded-sm">
              <b>Access Denied </b> SomeThing wrong with html dynamically
              generated avoid nesting too many fonts and font types
            </div>
            <div>
              <Link href="/checkout">GetWriteAccess</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Write;
