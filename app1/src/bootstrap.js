import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
  ]);

ReactDOM.render(<App/>, document.getElementById("root"));
