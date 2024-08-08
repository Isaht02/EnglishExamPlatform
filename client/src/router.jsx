/** @format */

// import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import the createBrowserRouter function and RouterProvider component
import Chat from "./Chat";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/chat",
    element: <Chat />,
  },
]);

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("root");
  if (!container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <RouterProvider router={router} />
    );
  }
});
export default router;
