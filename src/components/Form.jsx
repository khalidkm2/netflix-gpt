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
  const [errorMessage, setErrorMessage] = useState(null)

  const dispatch = useDispatch();

  const handleToggleSignIn = () => {
    setisSignIn(!isSignIn);
  };

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
        <Form className="bg-black bg-opacity-65 w-9/12 md:w-3/12 p-4 md:mt-52 absolute mt-24 mx-auto right-0 left-0 flex flex-col text-white pb-5 rounded-sm">
          <h2 className="mt-3 pb-10 pt-4 w-9/12  mx-auto text-center text-3xl font-bold">
           {isSignIn?"Sign in":"Sign up"}
          </h2>
          {!isSignIn && (
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <Field
                required
                className="bg-gray-600 mb-2 border border-gray-500 transition-all outline-none text-gray-50 text-sm rounded-lg focus:outline-none focus:ring-gray-400 focus:border focus:border-gray-400 block w-full p-2.5"
                name="fullName"
                type="text"
              />
              <ErrorMessage name="fullName" />
            </div>
          )}

          <label className="block mb-2 text-sm font-medium" htmlFor="email">
            Email Address
          </label>
          <Field
            className="bg-gray-600 border mb-2 border-gray-500 transition-all outline-none text-gray-50 text-sm rounded-lg focus:outline-none focus:ring-gray-400 focus:border focus:border-gray-400 block w-full p-2.5"
            name="email"
            type="email"
          />
          <ErrorMessage
            className=" text-xs py-1 text-gray-400"
            component={"div"}
            name="email"
          />

          <label className="block mb-2 text-sm font-medium" htmlFor="email">
            Password
          </label>
          <Field
            className="bg-gray-600 border border-gray-500 transition-all outline-none text-gray-50 text-sm rounded-lg focus:outline-none focus:ring-gray-400 focus:border focus:border-gray-400 block w-full p-2.5"
            name="password"
            type="text"
          />
          <ErrorMessage
            className=" text-xs py-1 text-gray-400"
            component={"div"}
            name="password"
          />

          <p className="text-red-500 text-xs  text-md mt-1 p-2 w-9/12 ">
            {errorMessage}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white mt-8 flex justify-center items-center bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {isSignIn ? "Sign in" : "Sign up"}
            {isSubmitting ? (
              <div className=" px-2 py-0">
                <Oval height={20} color="white" width={20} />
              </div>
            ) : null}
          </button>
          <p
            className="mt-3 underline p-2 w-9/12 mx-auto cursor-pointer italic font-thin"
            onClick={handleToggleSignIn}
          >
            {isSignIn
              ? " New to Netflix? sign up now"
              : "Already have an account? sign in here"}
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default FormPage;
