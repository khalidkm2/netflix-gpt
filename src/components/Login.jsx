import React, { useRef, useState } from "react";
import Header from "./Header";
import { formValidate } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { AVATAR_LOGO, BACKGROUND } from "../utils/constants";
import bgimagecolor from "../assets/bgimagecolor.jpg"
import { Oval } from "react-loader-spinner";
import FormPage from "./Form";


const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading,setisLoading] = useState(false)
  const dispatch = useDispatch();
  const [showPassword,setShowPassword] = useState(false)


  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleValidation = () => {
    // validate
    setisLoading(true)
    const msg = isSignIn
      ? formValidate(email.current.value, password.current.value)
      : formValidate(
          email.current.value,
          password.current.value,
          fullName.current.value
        );
    setErrorMessage(msg);
    console.log("mes",msg)
    if(!msg){
      setisLoading(false)
    }

    if (errorMessage) {
      // setisLoading(false)
      return
    }

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);

          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: AVATAR_LOGO,
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
              
            })
            .catch((error) => {
              setisLoading(false)
              // An error occurred
              // ...
              // console.log(error);
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

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          setisLoading(false)
        });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)

  }

  return (
 <div className="relative min-h-screen">
  <Header />

  {/* Background Image */}
  <div className="absolute inset-0 -z-10">
    <img
      className="w-full h-full object-cover brightness-50"
      src={bgimagecolor}
      alt="background"
    />
  </div>

  {/* Form Section */}
  <div className="flex items-center justify-center px-4 py-10 sm:py-20 min-h-screen">
    <FormPage />
  </div>
</div>

  );
};

export default Login;
