import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";

import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { Provider } from "./components/ui/provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
