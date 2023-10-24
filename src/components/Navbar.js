import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className=" mx-auto sm:px-10 px-3 flex justify-between bg-orange-300  w-full sm:h-[70px] h-[50px] flex items-center text-white">
      <h1 className="font-[600]  md:text-2xl sm:text-xl text-md">
        Task Management
      </h1>
      <button
        className="font-[400] md:text-xl sm:text-lg text-sm px-3 py-1 rounded-2xl hover:bg-white hover:text-orange-500 duration-200"
        onClick={() => {
          localStorage.setItem("accessToken", "");
          navigate("/");
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Navbar;
