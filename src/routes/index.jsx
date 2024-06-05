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
  UpdateProfilePage,
  NotificationPage,
  CheckoutPage,
  PaymentPage,
  HistoryPage
} from "../pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
    element: <AccountPage />,
  },
  {
    path: "/update-profile",
    element: <UpdateProfilePage />,
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
