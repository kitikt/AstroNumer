import ProtectedAuthRoute from "@/components/ProtectedAuthRoute";
import ProtectedFormRoute from "@/components/ProtectedRouteForm";
import AdminLayout from "@/layouts/AdminLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import AboutUs from "@/pages/AboutUs";
import AccountManagementPage from "@/pages/AccountManagementPage";
import Analyze from "@/pages/Analyze";
import PaymentCancelPage from "@/pages/Cancel";
import DailyDestiny from "@/pages/DailyDestiny";
import DashboardPage from "@/pages/DashboardPage";
import ForgotPassword from "@/pages/ForgotPassword";
import FormPage from "@/pages/FormPage";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/LoginPage";
import MemberShip from "@/pages/MemberShip";
import NumerologyResultPage from "@/pages/NumerologyResultPage";
// import Profile from "@/pages/Profile";
import RegisterPage from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import Result from "@/pages/Result";
import PaymentReturnPage from "@/pages/Return";
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
    path: "/reset-password/",
    element: (
      <ProtectedAuthRoute>
        <ResetPassword />
      </ProtectedAuthRoute>
    ),
  },

  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "numerology", element: <NumerologyResultPage /> },
      { path: "about", element: <AboutUs /> },
      { path: "service", element: <Service /> },
      { path: "membership", element: <MemberShip /> },
      // { path: "profile", element: <Profile /> },
      { path: "analyze", element: <Analyze /> },
      { path: "daily-destiny", element: <DailyDestiny /> },
      { path: "result", element: <Result /> },
      { path: "/payment/cancel", element: <PaymentCancelPage /> },
      { path: "/payment/success", element: <PaymentReturnPage /> },

      {
        path: "/form/",
        element: (
          <ProtectedFormRoute>
            <FormPage />
          </ProtectedFormRoute>
        ),
      },
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
