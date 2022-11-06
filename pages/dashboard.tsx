import { useState, useEffect } from "react";
import Header from "../components/Header";
import { auth } from "../utils/firebase";

import { useRouter } from "next/router";

const Dashboard = () => {
  const route = useRouter();
  const [user, setUser] = useState({
    email: "",
    displayName: "friend",
    photoURL: "",
  });
  useEffect(() => {
    const localStr = localStorage.getItem("geoblog-mail");
    while (typeof window === "undefined") {}

    if (localStr === null) {
      route.push("/auth/login");
      return;
    }
    The(localStr);
  }, []);
  const The = (str: string) => {
    const data = JSON.parse(str);
    setUser({
      email: data.email,
      displayName: data.displayName,
      photoURL: data.photoURL,
    });
  };
  if (user) {
    return (
      <div>
        <Header />
        <h1>Welcome to your Dashboard {user?.displayName} </h1>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    );
  }
};

export default Dashboard;
