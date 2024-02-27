import React from "react";
import Login from "./components/Login";
import Browse from "./components/Browse";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MovieInfo from "./components/MovieInfo";

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
  }
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
