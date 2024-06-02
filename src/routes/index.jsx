import { createBrowserRouter } from "react-router-dom"

// pages
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  VerifiedOtpPage,
  RegisterPage,
  RiwayatPage,
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
    path: "/OTP",
    element: <VerifiedOtpPage />,
  },
  {
    path: "/riwayat",
    element: <RiwayatPage />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
])

export default router
