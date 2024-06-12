import { createBrowserRouter } from "react-router-dom"

// pages
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  VerifyOtpPage,
  RegisterPage,
  SearchingPage,
  ProfilePage,
  NotificationPage,
  CheckoutPage,
  PaymentPage,
  HistoryPage
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
    element: <ProfilePage />,
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

