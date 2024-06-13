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
  ForgotPasswordPage,
  ResetPasswordPage,
  HistoryPage,
} from "../pages"

// components
import UserProtected from "../components/Protected/Protected";
import NonProtected from "../components/Protected/NonProtected";
import NavbarComponent from "../components/Navigation/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NonProtected>
          <NavbarComponent />
          <HomePage />,
        </NonProtected>
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <NonProtected>
          <RegisterPage />,
        </NonProtected>
      </>
    ),
  },
  {
    path: "/login",
    element:(
    <>
      <NonProtected>
        <LoginPage />,
      </NonProtected>
    </>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <>
        <UserProtected>
          <ForgotPasswordPage />
        </UserProtected>
      </>
    ),
  },
  {
    path: "/reset-password/:id/:token",
    element: (
      <>
        <UserProtected>
          <ResetPasswordPage />
        </UserProtected>
      </>
    ),
  },
  {
    path: "/verify-otp",
    element: (
      <>
        <UserProtected>
          <VerifyOtpPage />
        </UserProtected>
      </>
    ),
  },
  {
    path: "/history",
    element: (
      <>
        <UserProtected>
          <HistoryPage />
        </UserProtected>
      </>
    ),
  },
  {
    path: "/*",
    element: (
      <NotFoundPage />
    ),
  },
  {
    path: "/search",
    element: (
      <NonProtected>
        <SearchingPage />
      </NonProtected>
    ),
  },
  {
    path: "/profile",
    element: (
      <UserProtected>
        <AccountPage />
      </UserProtected>
    ),
  },
  {
    path: "/notification",
    element: (
      <UserProtected>
        <NotificationPage />
      </UserProtected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <UserProtected>
        <CheckoutPage />
      </UserProtected>
    ),
  },
  {
    path: "/payment",
    element: (
      <UserProtected>
        <PaymentPage />
      </UserProtected>
    ),
  },
]);

export default router