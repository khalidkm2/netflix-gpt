import React, { useRef, useState } from "react";
import Header from "./Header";
import { formValidate } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleValidation = () => {
    // validate

    const msg = isSignIn
      ? formValidate(email.current.value, password.current.value)
      : formValidate(
          email.current.value,
          password.current.value,
          fullName.current.value
        );
    setErrorMessage(msg);

    if (msg) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);

          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL:
              "https://i.pinimg.com/474x/bc/f0/27/bcf0272b061414169e8d2e21659223c7.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
              console.log("Profile updated");
            })
            .catch((error) => {
              // An error occurred
              // ...
              console.log(error);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
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

      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black bg-opacity-65 w-3/12 absolute mt-24 mx-auto right-0 left-0 flex flex-col text-white pb-20 rounded-sm"
      >
        <h2 className="mt-3 pb-10 pt-4 w-9/12 mx-auto text-3xl font-bold">
          Sign in
        </h2>
        {!isSignIn && (
          <input
            ref={fullName}
            className="mt-3 p-2 w-9/12 mx-auto rounded-md bg-gray-600"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className="mt-3 p-2 w-9/12 mx-auto rounded-md bg-gray-600"
          type="text"
          placeholder="email address"
        />
        <input
          ref={password}
          className="mt-3 p-2 w-9/12 mx-auto rounded-md bg-gray-600"
          type="password"
          placeholder="password"
        />
        <p className="text-red-500 font-bold text-md mt-1 p-2 w-9/12 mx-auto">
          {errorMessage}
        </p>
        <button
          onClick={handleValidation}
          className="mt-8 p-3 w-9/12 bg-red-500 mx-auto rounded-md"
        >
          {isSignIn ? "sign in" : "sign up"}
        </button>
        <p
          className="mt-3 p-2 w-9/12 mx-auto cursor-pointer"
          onClick={handleToggleSignIn}
        >
          {isSignIn
            ? " New to Netflix? sign up now"
            : "Already have an account? sign in here"}
        </p>
      </form>
    </div>
  );
};

export default Login;
