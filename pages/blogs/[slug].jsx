import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import axios from "axios";
import parse from "html-react-parser";
import Header from "../../components/Header";
const Get = () => {
  const route = useRouter();
  const [blog, setBlog] = useState([]);
  const [body, setBody] = useState([]);
  useEffect(() => {
    getBlog();
  }, []);
  const getBlog = async () => {
    try {
      const res = await axios.get("/api/articles/get-blog?id=5");

      console.log("====================================");
      const strbody = res.data.blog[0].body;
      console.log(strbody);
      if (!res.data.error) setBlog(res.data.blog[0]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <main>
        <Header />

        {blog !== [] && (
          <article className="text-w-3xl max-w-5xl mx-auto p-5">
            <h1 className="text-3xl mt-10 mb-3">{blog[0]?.title}</h1>
            <h2 className="text-xl font-light text-gray-300 mb-2">
              {blog[0]?.description}
            </h2>
            <div className="flex items-center space-x-2">
              <p className="font-extralight text-sm">
                Blog Post By
                <span className="text-orange-600 px-2">
                  author id : {blog[0]?.uid}
                </span>{" "}
              </p>
            </div>
            {/*
            //dangerouslySetInnerHTML={{ __html: body }}
             */}
            <div className="px-[2vw] max-w-5xl">{body}</div>
          </article>
        )}
      </main>
    </div>
  );
};

export default Get;
