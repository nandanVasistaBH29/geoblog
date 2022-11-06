import AdFree from "./products/AdFree";
import EliteMember from "./products/EliteMember";
import BecomeAWriter from "./products/BecomeAWriter";
import Header from "../components/Header";
import { useRouter } from "next/router";
const Checkout = () => {
  const route = useRouter();
  const user = localStorage.getItem("geoblog-mail");
  if (!user) {
    route.push("/auth/register");
  }
  return (
    <div>
      <Header />
      <div className="my-2 md:my-8 h-[100vh] w-[100vw] flex flex-col items-center justify-center">
        <AdFree />
        <BecomeAWriter />
        <EliteMember />
      </div>
    </div>
  );
};

export default Checkout;
