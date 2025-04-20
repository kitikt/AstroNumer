import App from "@/App";
import DefaultLayout from "@/layouts/DefaultLayout";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import SecondPage from "@/pages/SecondPage";
import UserPage from "@/pages/UserPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { index: true, element: <HomePage /> },
            // Có thể bật thêm các route bên dưới nếu cần:
            // { path: "user", element: <UserPage /> },
            // { path: "login", element: <LoginPage /> },
            // { path: "track", element: <div>Hello Track</div> },
        ],
    },
    { path: '/login', element: <LoginPage /> },
]);
