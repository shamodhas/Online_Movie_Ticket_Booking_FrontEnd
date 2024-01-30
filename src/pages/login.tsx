import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="bg-white w-full h-screen flex flex-col items-center justify-center text-center">
      <div className="flex bg-white rounded-2xl shadow-2xl w-2/3 max-w-4xl">
        <div className="w-3/5 p-5">left</div>
        <div className="w-2/5 bg-primary-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
          <h2 className="text-3xl font-bold mb-2">Hello, watchers</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-10">Create account using personal information and start journey with us</p>
          <button></button>
          <Link
            to={"/register"}
            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold 
            hover:bg-white hover:text-primary-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
