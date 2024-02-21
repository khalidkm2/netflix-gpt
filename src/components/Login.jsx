import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute -z-10">
        <img
          className="filter brightness-50"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/7a5b8d64-09ba-41ce-aa4f-f7664f14fd52/NP-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>

      <form className="bg-black bg-opacity-65 w-3/12 absolute mt-24 mx-auto right-0 left-0 flex flex-col text-white pb-20 rounded-sm">
        <h2 className="mt-3 pb-10 pt-4 w-9/12 mx-auto text-3xl font-bold">
          Sign in
        </h2>
        {!isSignIn && (
          <input
            className="mt-3 p-2 w-9/12 mx-auto rounded-md bg-gray-600"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          className="mt-3 p-2 w-9/12 mx-auto rounded-md bg-gray-600"
          type="text"
          placeholder="email address"
        />
        <input
          className="mt-3 p-2 w-9/12 mx-auto rounded-md bg-gray-600"
          type="password"
          placeholder="password"
        />
        <button className="mt-8 p-3 w-9/12 bg-red-500 mx-auto rounded-md">
          {isSignIn ? "sign in" : "sign up"}
        </button>
        <p
          className="mt-3 p-2 w-9/12 mx-auto cursor-pointer"
          onClick={handleToggleSignIn}
        >
         {isSignIn?" New to Netflix? sign up now":"Already have an account? sign in here"}
        </p>
      </form>
    </div>
  );
};

export default Login;
