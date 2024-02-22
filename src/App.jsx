import React, { useEffect } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Browse from "./components/Browse";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import {  useDispatch } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
]);

const App = () => {

  const dispatch = useDispatch();


  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log("inside onauthstatechanged");
        const { uid, email, displayName,photoURL } = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        console.log("inside navigation");

        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <RouterProvider router={router}>
      <Header />
      <Login />
      <Browse />
    </RouterProvider>
  );
};

export default App;
