import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleShowGpt } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { setLanguage } from "../utils/configSlice";
import mylogo from "../assets/mylogo.png";
import { motion } from "framer-motion";

const Header = () => {
  const userData = useSelector((store) => store.user);
  const isGptPage = useSelector((store) => store.gpt.showGpt);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth).catch((err) => console.error(err));
  };

  const handleGpt = () => dispatch(toggleShowGpt());

  const handleChangeLang = (e) => dispatch(setLanguage(e.target.value));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="relative md:absolute w-full bg-black/70 md:bg-transparent px-4 py-3 z-20 flex justify-between items-center shadow-sm">
      <div className="w-32 md:w-44">
        <img src={mylogo} alt="Logo" className="h-auto w-full" />
      </div>

      {/* Mobile Menu Icon */}
      {userData && (
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      )}

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: isSidebarOpen ? "0%" : "100%", opacity: isSidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 right-0 h-full w-64 bg-zinc-900 z-50 p-6 flex flex-col shadow-lg ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        <button
          className="text-white text-2xl self-end mb-6"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {userData && (
          <>
            {isGptPage && (
              <select
                onChange={handleChangeLang}
                className="bg-zinc-800 text-white px-3 py-2 mb-4 rounded-md w-full"
              >
                {SUPPORTED_LANGUAGES.map((lan) => (
                  <option key={lan.identifier} value={lan.identifier}>
                    {lan.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={handleGpt}
              className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-md mb-3"
            >
              {isGptPage ? "Home" : "Search"}
            </button>

            <Link
              to="/watch-list"
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md mb-3 text-center"
            >
              Watchlist
            </Link>

            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Sign Out
            </button>
          </>
        )}
      </motion.div>

      {/* Desktop Buttons */}
      {userData && (
        <div className="hidden md:flex items-center gap-4">
          {isGptPage && (
            <select
              onChange={handleChangeLang}
              className="bg-black text-white px-3 py-2 rounded-md"
            >
              {SUPPORTED_LANGUAGES.map((lan) => (
                <option key={lan.identifier} value={lan.identifier}>
                  {lan.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGpt}
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            {isGptPage ? "Home" : "Search"}
          </button>

          <Link
            to="/watch-list"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Watchlist
          </Link>

          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
