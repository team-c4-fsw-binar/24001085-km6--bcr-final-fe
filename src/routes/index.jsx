import { createBrowserRouter } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"

// pages
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  VerifyOtpPage,
  RegisterPage,
  SearchingPage,
} from "../pages"

import ResetPasswordPage from "../pages/Auth/ResetPasswordPage"
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage"

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
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
  {
    path: "/search",
    element: <SearchingPage />,
  },
])

export default router

