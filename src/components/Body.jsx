import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Moviedetail from "./Moviedetail";

import Layout from "./Layout";
import GptSearch from "./GptSearch";

function Body() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Login />,
          children: [
            {
              path: "gpt-search",
              element: <GptSearch />,
            },
          ],
        },
        {
          path: "browse",
          element: <Browse />,
        },
        {
          path: "movie/:id",
          element: <Moviedetail />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default Body;
