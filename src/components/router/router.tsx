import DefaultLayout from "@/layouts/DefaultLayout";
import AboutUs from "@/pages/AboutUs";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { index: true, element: <HomePage /> },
                 {path: "about" , element:<AboutUs/>}
            // Có thể bật thêm các route bên dưới nếu cần:
            // { path: "user", element: <UserPage /> },
            // { path: "login", element: <LoginPage /> },
            // { path: "track", element: <div>Hello Track</div> },
        ],
    },
    { path: '/login', element: <LoginPage /> },
]);
