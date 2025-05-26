import ProtectedAuthRoute from "@/components/ProtectedAuthRoute";
import AdminLayout from "@/layouts/AdminLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import AboutUs from "@/pages/AboutUs";
import AccountManagementPage from "@/pages/AccountManagementPage";
import Analyze from "@/pages/Analyze";
import DailyDestiny from "@/pages/DailyDestiny";
import DashboardPage from "@/pages/DashboardPage";
import ForgotPassword from "@/pages/ForgotPassword";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/LoginPage";
import MemberShip from "@/pages/MemberShip";
import Profile from "@/pages/Profile";
import RegisterPage from "@/pages/Register";
import Result from "@/pages/Result";
import Service from "@/pages/Service";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <ProtectedAuthRoute>
        <LoginPage />
      </ProtectedAuthRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedAuthRoute>
        <RegisterPage />
      </ProtectedAuthRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ProtectedAuthRoute>
        <ForgotPassword />
      </ProtectedAuthRoute>
    ),
  },

  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutUs /> },
      { path: "service", element: <Service /> },
      { path: "membership", element: <MemberShip /> },
      { path: "profile", element: <Profile /> },
      { path: "analyze", element: <Analyze /> },
      { path: "daily-destiny", element: <DailyDestiny /> },
      { path: "result", element: <Result /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to={"dashboard"} /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "accounts", element: <AccountManagementPage /> },
    ],
  },
]);
