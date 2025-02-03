import React from "react";
import Login from "./components/Login";
import Browse from "./components/Browse";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import MovieInfo from "./components/MovieInfo";
import Header from "./components/Header";
import WatchList from "./components/WatchList"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path:"/movie-info/:id",
    element:<MovieInfo/>
  },
  {
    path:"/watch-list",
    element:<WatchList/>
  }
]);

const App = () => {
  return <RouterProvider router={router}>
   
   
  </RouterProvider>;
};

export default App;
