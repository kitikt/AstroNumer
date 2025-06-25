import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { AuthProvider } from "@/context/AuthProvider";
import { Provider } from "./components/ui/Provider";
import "./utils/apiDebug.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
