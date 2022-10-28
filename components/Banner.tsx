const Banner = () => {
  return (
    <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 md:py-0 max-w-7xl mx-auto">
      <div className="px-10 space-y-5">
        <h1 className=" text-6xl max-w-xl font-serif">
          <span className="tracking-wide underline decoration-orange-700">
            Geopolitics
          </span>{" "}
          focuses on political power linked to geographic space.
        </h1>
        <h2>
          In particular, territorial waters and land territory in correlation
          with diplomatic history.
        </h2>
      </div>
      <img
        className="hidden md:inline-flex h-full p-10"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSeYpyXGVHxo7dHYU4p3FfnT-REFgmhmOxnq31W1Jew&s"
        alt="hi"
      />
    </div>
  );
};

export default Banner;
