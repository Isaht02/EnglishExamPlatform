/** @format */

import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import axios from "axios";
import { useEffect } from "react";

function App() {
  // const getUser = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "text/javascript; charset=utf-8",
        },
        baseURL: import.meta.env.VITE_API_URL,
        // signal: controller.signal,
      })
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data));
      });

    return () => {
      controller.abort();
    };
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
