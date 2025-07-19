import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { AVATAR_LOGO } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Oval } from "react-loader-spinner";

const FormPage = () => {
  const [isSignIn, setisSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [guestLoading,setGuestLoading] = useState(false);

  const dispatch = useDispatch();

  const handleToggleSignIn = () => {
    setisSignIn(!isSignIn);
  };

  const handleGuestLogin = () => {
    setGuestLoading(true)

      signInWithEmailAndPassword(auth, "guest@gmail.com", "guest@123")
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              // console.log(user);

              // ...
            })
            .catch((error) => {
              console.log(error);
              setGuestLoading(false);
              setErrorMessage("Invalid email or password");
            });
  }

  return (
    <Formik
      initialValues={{ fullName: "", email: "", password: "" }}
      validationSchema={Yup.object({
        fullName: Yup.string().max(15, "Must be 15 characters or less"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(6, "Must be atleast 6 characters")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        console.log("Form submitted with values:", values);
        if (!isSignIn) {
          createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              // Signed up
              const user = userCredential.user;
              // console.log(user);

              updateProfile(user, {
                displayName: values.fullName,
                photoURL: AVATAR_LOGO,
              })
                .then(() => {
                  // Profile updated!
                  // ...
                  const { uid, email, displayName, photoURL } =
                    auth.currentUser;
                  dispatch(
                    addUser({
                      uid: uid,
                      email: email,
                      displayName: displayName,
                      photoURL: photoURL,
                    })
                  );
                })
                .catch((error) => {
                  console.log(error);
                  setSubmitting(false);
                });
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message.slice(-28)
              // const shortMessage = errorMessage.slice(0,10)
              setErrorMessage(errorMessage);
              console.log(error);
              setSubmitting(false);
              // ..
            });
        } else {
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              // console.log(user);

              // ...
            })
            .catch((error) => {
              console.log(error);
              setSubmitting(false);
              setErrorMessage("Invalid email or password");
            });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-black bg-opacity-65 w-[90%] sm:w-4/5 md:w-2/5 lg:w-1/3 xl:w-1/4 p-6 mt-24 sm:mt-32 md:mt-40 mx-auto flex flex-col text-white rounded-md">
  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
    {isSignIn ? "Sign in" : "Sign up"}
  </h2>

  {!isSignIn && (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium" htmlFor="fullName">
        Full Name
      </label>
      <Field
        required
        className="bg-gray-600 border border-gray-500 text-sm rounded-lg block w-full p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        name="fullName"
        type="text"
      />
      <ErrorMessage className="text-xs text-gray-300 mt-1" name="fullName" component="div" />
    </div>
  )}

  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium" htmlFor="email">
      Email Address
    </label>
    <Field
      className="bg-gray-600 border border-gray-500 text-sm rounded-lg block w-full p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
      name="email"
      type="email"
    />
    <ErrorMessage className="text-xs text-gray-300 mt-1" name="email" component="div" />
  </div>

  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium" htmlFor="password">
      Password
    </label>
    <Field
      className="bg-gray-600 border border-gray-500 text-sm rounded-lg block w-full p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
      name="password"
      type="password"
    />
    <ErrorMessage className="text-xs text-gray-300 mt-1" name="password" component="div" />
  </div>

  <p className="text-red-500 text-sm mt-1">{errorMessage}</p>

  <button
    type="submit"
    disabled={isSubmitting}
    className="mt-6 flex justify-center items-center bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-white transition"
  >
    {isSignIn ? "Sign in" : "Sign up"}
    {isSubmitting && (
      <div className="ml-2">
        <Oval height={20} width={20} color="white" />
      </div>
    )}
  </button>
  {isSignIn?<button onClick={handleGuestLogin} className="mt-6 flex justify-center items-center bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-white transition">Guest 🤵🏻
  {guestLoading && (
      <div className="ml-2">
        <Oval height={20} width={20} color="white" />
      </div>
    )}
  </button>:""}

  <p
    onClick={handleToggleSignIn}
    className="mt-4 text-sm text-center text-gray-300 underline cursor-pointer"
  >
    {isSignIn ? "New to flixify? Sign up now" : "Already have an account? Sign in here"}
  </p>
</Form>

      )}
    </Formik>
  );
};

export default FormPage;
