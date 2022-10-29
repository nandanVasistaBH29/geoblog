import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../components/Header";
import { auth } from "../utils/firebase";

import { useRouter } from "next/router";
import Link from "next/link";
const Dashboard = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  if (!user) {
    return (
      <>
        Please Login First{" "}
        <Link href={"/auth/login"}>
          <button className="block cursor-pointer border border-orange-600 rounded-lg text-orange-600 p-2">
            Click here
          </button>
        </Link>
      </>
    );
  }
  if (loading) {
    <h1>Loading...</h1>;
  }
  if (user) {
    return (
      <div>
        <Header />
        <h1>Welcome to your Dashboard {user?.displayName} </h1>
        <button
          className="block cursor-pointer border border-orange-600 rounded-lg text-orange-600 p-2"
          onClick={() => auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }
};

export default Dashboard;
