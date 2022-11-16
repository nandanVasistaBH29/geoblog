import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//
import axios from "axios";
import Header from "../../components/Header";
import DOMPurify from "isomorphic-dompurify";

const Get = () => {
  const route = useRouter();
  let slug = route.query.slug;
  const [blog, setBlog] = useState([]);
  const [body, setBody] = useState([]);
  useEffect(() => {
    getBlog();
  }, [slug]);
  const getBlog = async () => {
    try {
      if (!slug) {
        slug = route.query.slug;
      }
      if (slug) {
        const res = await axios.get(`/api/articles/get-blog?id=${slug}`);
        setBlog(res.data.blog[0]);
        const bodyURL = res.data.blog[0].bodyURL;
        console.log(bodyURL);
        const res2 = await axios.get(bodyURL);
        const clean = DOMPurify.sanitize(res2.data);
        setBody(clean);
      }
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
            <h1 className="text-3xl mt-10 mb-3">{blog.title}</h1>
            <h2 className="text-xl font-light text-gray-300 mb-2">
              {blog.description}
            </h2>
            <div className="flex items-center space-x-2">
              <p className="font-extralight text-sm">
                Blog Post By
                <span className="text-orange-600 px-2">
                  author id : {blog.uid}
                </span>
              </p>
            </div>
            <div className="px-[2vw] max-w-5xl">
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default Get;
