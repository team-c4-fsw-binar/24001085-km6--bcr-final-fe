import { createBrowserRouter } from "react-router-dom"

// pages
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  VerifyOtpPage,
  RegisterPage,
  SearchingPage,
  AccountPage,
  NotificationPage,
  CheckoutPage,
  PaymentPage,
  HistoryPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  
} from "../pages"

// components
import UserProtected from "../components/Protected/Protected";
import NonProtected from "../components/Protected/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
      <HomePage />,
    </>
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:id/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtpPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
  {
    path: "/search",
    element: <SearchingPage />,
  },
  {
    path: "/profile",
    element: <AccountPage />,
  },
  {
    path: "/notification",
    element: <NotificationPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
]);

export default router

