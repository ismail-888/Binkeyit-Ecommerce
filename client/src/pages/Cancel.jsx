import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="m-2 w-full max-w-md bg-red-200 p-4  py-5 rounded mx-auto flex flex-col items-center justify-center gap-5">
      <p className="text-red-800 font-bold text-lg text-center">
        Order Cancelled
      </p>
      <Link
        to={"/"}
        className="border border-red-900 text-red-900 hover:bg-red-900 hover:text-white px-4 py-1 transition-all"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default Cancel;
