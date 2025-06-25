import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedAuthRoute from "@/components/ProtectedAuthRoute";
import ProtectedFormRoute from "@/components/ProtectedRouteForm";
import StarMapForm from "@/components/StarMapForm";
import FormHome from "@/components/ui/FormHome";
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
import RegisterPage from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import Result from "@/pages/Result";
import PaymentReturnPage from "@/pages/Return";
import Service from "@/pages/Service";
import StarMapPage from "@/pages/StarMap";
import PurchasedServices from "@/pages/User/PurchasedServices";
import ProfilePage from "@/pages/User/Profile";
import ChatBot from "@/pages/ChatBot";
import MBTIQuiz from "@/pages/Mbti";
import FeedbackPage from "@/pages/FeedbackPage";

// Cấu hình các form
const formConfigs = [
  {
    path: "/form/numerology",
    dataKey: "numerologyData",
    redirectPath: "/numerology",
    component: FormHome,
  },
];

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
    path: "//profile/transaction",
    element: <PurchasedServices />,
  },
  {
    path: "//profile/edit",
    element: <ProfilePage />,
  },
  { path: "/payment/cancel", element: <PaymentCancelPage /> },

  { path: "/payment/success", element: <PaymentReturnPage /> },
  { path: "/chat", element: <ChatBot /> },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "numerology", element: <NumerologyResultPage /> },
      { path: "starmap-result", element: <StarMapPage /> },
      { path: "about", element: <AboutUs /> },
      { path: "service", element: <Service /> },
      { path: "membership", element: <MemberShip /> },
      { path: "analyze", element: <Analyze /> },
      { path: "daily-destiny", element: <DailyDestiny /> },
      { path: "result", element: <Result /> },
      { path: "mbti", element: <MBTIQuiz /> },
      { path: "feedback", element: <FeedbackPage /> },

      // Thêm route cho StarMapForm trực tiếp, không bọc ProtectedFormRoute
      {
        path: "/form/starmap",
        element: <FormPage FormComponent={StarMapForm} />,
      },
      ...formConfigs.map(({ path, dataKey, redirectPath, component }) => ({
        path,
        element: (
          <ProtectedFormRoute dataKey={dataKey} redirectPath={redirectPath}>
            <FormPage FormComponent={component} />
          </ProtectedFormRoute>
        ),
      })),
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "accounts", element: <AccountManagementPage /> },
    ],
  },
]);
