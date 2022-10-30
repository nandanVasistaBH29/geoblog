import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../components/Header";
import { auth } from "../utils/firebase";

import { useRouter } from "next/router";
const Dashboard = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  if (!user) {
    route.push("/auth/login");
    return;
  }
  if (loading) {
    <h1>Loading...</h1>;
  }
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
