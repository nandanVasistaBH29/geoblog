import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
// 1-> adfree idofPurcase
// 2-> become a writer
// 3-> become a elite writer
const success = () => {
  const route = useRouter();
  const { session_id } = route.query;
  useEffect(() => {
    if (session_id) handleUpgrade();
  }, [session_id]);
  const handleUpgrade = async () => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("geoblog-mail")
    );
    let email;
    while (!dataFromLocalStorage) {
      email = prompt(email);
    }
    email = dataFromLocalStorage.email;
    while (!email) {
      email = prompt(email);
    }

    const res = await axios.post(
      `/api/auth/upgrade-profile?upgrade=${session_id}`,
      { email: email }
    );
    console.log(res);
  };
  return <div>Success </div>;
};

export default success;
