import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate,Link } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleShowGpt } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { setLanguage } from "../utils/configSlice";
import mylogo from "../assets/mylogo.png";
import { motion } from "framer-motion";

const Header = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isGptPage = useSelector((store) => store.gpt.showGpt);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGpt = () => {
    dispatch(toggleShowGpt());
  };

  const handleChangeLang = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div className=" relative md:absolute bg-black md:bg-transparent  rounded-md w-full flex justify-between z-10 items-center p-4">
      <div className="w-40 md:w-52">
        <img className="z-100" src={mylogo} alt="Logo" />
      </div>

      {/* Hamburger Menu */}
     {userData && ( <button
        className="md:hidden text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Open menu"
      >
        ☰
      </button>)}

      {/* Sidebar and Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: isSidebarOpen ? "0%" : "100%", opacity: isSidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 right-0 h-full bg-black w-64 p-4 flex flex-col items-center shadow-lg md:hidden z-30"
      >
       { userData && (<button
          className="text-white mb-4"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>)}

        {userData && (
          <>
            {/* {isGptPage && (
              <select
                className="bg-black text-gray-100 py-2 px-3 rounded-sm mb-2"
                onChange={handleChangeLang}
              >
                {SUPPORTED_LANGUAGES.map((lan) => (
                  <option key={lan.identifier} value={lan.identifier}>
                    {lan.name}
                  </option>
                ))}
              </select>
            )} */}
            <button
              className="text-white hover:bg-purple-900 mb-2 px-4 py-2 rounded-md bg-purple-800"
              onClick={handleGpt}
            >
              {isGptPage ? "Home" : "Search"}
            </button>
           <Link to={"/watch-list"}>
           <div className="text-white hover:bg-purple-900 mb-2 p-2 rounded-md bg-purple-800">
              Watchlist
            </div>
           </Link>
            <button
              className="px-3 hover:bg-red-800 transition-all duration-75 py-2 text-white bg-red-600 rounded-md"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </>
        )}
      </motion.div>

      {/* Desktop Navigation */}
      {userData && (
        <div className="hidden md:flex">
          {isGptPage && (
            <select
              className="bg-black text-gray-100 py-2 px-3 rounded-sm"
              onChange={handleChangeLang}
            >
              {SUPPORTED_LANGUAGES.map((lan) => (
                <option key={lan.identifier} value={lan.identifier}>
                  {lan.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white hover:bg-purple-900 mx-2 md:mx-6 p-1 md:p-2 rounded-md bg-purple-800"
            onClick={handleGpt}
          >
            {isGptPage ? "Home" : "Search"}
          </button>
         <Link to={"/watch-list"}>
         <div className="text-white hover:bg-purple-900 mx-2 md:mx-6 p-1 md:p-2 rounded-md bg-purple-800">
            Watchlist
          </div>
         </Link>
          <button
            className="px-4 hover:bg-red-800 transition-all duration-75 py-2 mr-2 text-white bg-red-600 rounded-md"
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
