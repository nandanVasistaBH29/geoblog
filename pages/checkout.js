import AdFree from "./products/AdFree";
import EliteMember from "./products/EliteMember";
import BecomeAWriter from "./products/BecomeAWriter";
import Header from "../components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkActionCode } from "firebase/auth";
const Checkout = () => {
  const route = useRouter();
  const [show, setShow] = useState(false);
  useEffect(() => {
    while (typeof window === "undefined") {}
    const user = localStorage.getItem("geoblog-mail");
    if (!user) setShow(false);
    else setShow(true);
  }, []);

  return (
    <div>
      {show ? (
        <>
          <Header />
          <div className="my-2 md:my-8 h-[100vh] w-[100vw] flex flex-col items-center justify-center">
            <AdFree />
            <BecomeAWriter />
            <EliteMember />
          </div>
        </>
      ) : (
        <Link href={"/auth/login"}>Login</Link>
      )}
    </div>
  );
};

export default Checkout;
