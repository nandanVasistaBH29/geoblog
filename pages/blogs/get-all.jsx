import axios from "axios";
import { useEffect, useState } from "react";

const Getall = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    getAllBlogs();
  }, []);
  const getAllBlogs = async () => {
    try {
      const res = await axios.get("/api/articles/get-all-blog/");
      if (res.data.error) setBlogs(res.data.blogs);
    } catch (err) {
      console.log(err);
    }
  };
  return <div></div>;
};

export default Getall;
