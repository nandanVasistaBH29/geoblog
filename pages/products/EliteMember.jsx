import { AiTwotoneCrown } from "react-icons/ai";
import Link from "next/link";
import { checkout } from "../../utils/stripePayment";
// 1-> adfree idofPurcase
// 2-> become a writer
// 3-> become a elite writer
const EliteMember = () => {
  const handleClick = () => {
    checkout(
      {
        lineItems: [
          {
            price: "price_1M17SzSFs1QSUGsJnUp1LFUQ",
            quantity: 1,
          },
        ],
      },
      3
    );
  };
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer flex flex-row items-center justify-center p-2 m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <AiTwotoneCrown className="text-orange-500 text-7xl mx-2 m-t-2 font-bold text-center  md:text-8xl lg:text-9xl" />

      <div className="p-5">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Get <span className="text-green-500 text-3xl">Elite</span> MemberShip
        </h1>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Be A Part Of Most Loved <span className="text-pink-400">Family</span>
          <b className="mx-2 text-green-200">Elite Member</b>
        </p>
        <Link
          href="#"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          BUY ₹100,000
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            cursor="pointer"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </button>
  );
};

export default EliteMember;
