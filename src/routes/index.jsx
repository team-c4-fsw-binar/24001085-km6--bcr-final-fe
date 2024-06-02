import { createBrowserRouter } from "react-router-dom";

// pages
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  VerifiedOtpPage,
  RegisterPage
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
    path: "/*",
    element: <NotFoundPage />,
  },
]);

export default router