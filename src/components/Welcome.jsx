import React from "react";

const Welcome = ({handleStart}) => {
  return (
    <>
      <div className="bg-gray-800 h-screen w-screen text-white font-semibold text-center flex flex-col justify-center items-center">
        <div className="text-4xl">Welcome to</div>
        <div className="text-6xl font-extrabold mb-5">Traveey Quiz App</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" onClick={()=>handleStart(true)}>
          Let's start
        </button>
      </div>
    </>
  );
};

export default Welcome;
