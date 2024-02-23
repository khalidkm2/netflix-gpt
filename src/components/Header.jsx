import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        console.log("inside onauthstatechanged");
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        console.log("inside navigation");
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

  return (
    <div className=" absolute w-screen flex justify-between bg-gradient-to-b from-black items-center ">
      <div className=" w-60  py-2 px-4  ">
        <img className=" z-10" src={LOGO} />
      </div>
      {userData && (
        <div>
          <img className=" w-12 h-12 " src={userData?.photoURL} />
          <button
            className=" px-3 py-2  bg-red-500 rounded-md"
            onClick={handleSignOut}
          >
            Sign out
          </button>
          <p>{userData?.displayName}</p>
        </div>
      )}
    </div>
  );
};

export default Header;
