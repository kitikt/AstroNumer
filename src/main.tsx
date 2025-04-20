import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";

import {

  RouterProvider,
} from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { router } from "@/components/router/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);