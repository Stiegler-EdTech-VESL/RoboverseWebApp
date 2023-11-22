import React from "react";

const VeslVerseTab = () => {
  return (
    <div className="hidden md:block w-[50%] mx-auto">
      <a href="https://app.vesl.gg/catalog">
        <div
          className="hover:border-b-full
      rounded-b-full bg-gradient-to-br 
    from-green-200 via-green-500 to-green-800 py-2 text-black 
    sm:transition-none md:transition-none lg:transition-all lg:hover:mx-[35%] "
          style={{ animation: "none" }}
        >
          <div className="flex items-center justify-center ">
            <p className=" ">MORE IN THE VESLVERSE</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default VeslVerseTab;
