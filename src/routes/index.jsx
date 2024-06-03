import { createBrowserRouter } from "react-router-dom";

// pages
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  VerifyOtpPage,
  RegisterPage,
  SearchingPage,
  
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
    path: "/*",
    element: <NotFoundPage />,
  },
  {
    path: "/search",
    element: <SearchingPage />,
  }
]);

export default router