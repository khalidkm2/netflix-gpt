import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleShowGpt } from "../utils/gptSlice";
import {SUPPORTED_LANGUAGES} from "../utils/constants";
import { setLanguage } from "../utils/configSlice";

const Header = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isGptPage = useSelector((store) => store.gpt.showGpt)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("sign out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
        
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");

        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGpt = () => {
    dispatch(toggleShowGpt())
  }

  const handleChangeLang = (e) => {
    // console.log(e.target.value);
    dispatch((setLanguage(e.target.value)))
  }

  return (
    <div className=" absolute w-full flex justify-between z-10 items-center ">
      <div className=" w-40 md:w-60  py-2 px-4  ">
        <img className=" z-100" src={LOGO} />
      </div>
      {userData && (
        <div className=" flex">
       
       {isGptPage &&  <select className=" bg-black text-gray-100 py-2 px-3 rounded-sm" onChange={(e)=> handleChangeLang(e)}>
       {SUPPORTED_LANGUAGES.map((lan) => <option key={lan.identifier} value={lan.identifier}>{lan.name}</option>) }
        </select>}

        <button className=" text-white mx-2 md:mx-6  p-1 md:p-2 rounded-md bg-purple-800" onClick={handleGpt}>{isGptPage?"Home":"Search-gpt"}</button>
         {/* { <img className=" w-12 h-12 hidden md:block " src={userData?.photoURL} />
          } */}
         
          <button
            className=" px-4 py-2 mr-2 text-white  bg-red-600 rounded-md"
            onClick={handleSignOut}
          >
            Sign out
          </button>
         
        </div>
      )}
    </div>
  );
};

export default Header;
