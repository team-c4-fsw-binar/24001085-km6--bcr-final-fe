import { createBrowserRouter } from "react-router-dom";
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
<<<<<<< HEAD
} from "../pages"

// components
import UserProtected from "../components/Protected/Protected"
import NonProtected from "../components/Protected/NonProtected"
import NavbarComponent from "../components/Navigation/Navbar"
=======
} from "../pages";
import UserProtected from "../components/Protected/Protected";
import NonProtected from "../components/Protected/NonProtected";
import NavbarComponent from "../components/Navigation/Navbar";
>>>>>>> 70ae3078330a6a8a148fa202605b9790b6a78bcc

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NonProtected>
          <NavbarComponent />
          <HomePage />
        </NonProtected>
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <NonProtected>
          <RegisterPage />
        </NonProtected>
      </div>
    ),
  },
  {
    path: "/login",
    element: (
<<<<<<< HEAD
      <>
        <NonProtected>
          <LoginPage />,
        </NonProtected>
      </>
=======
      <div>
        <NonProtected>
          <LoginPage />
        </NonProtected>
      </div>
>>>>>>> 70ae3078330a6a8a148fa202605b9790b6a78bcc
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <div>
        <NonProtected>
          <ForgotPasswordPage />
        </NonProtected>
      </div>
    ),
  },
  {
    path: "/reset-password/:id/:token",
    element: (
      <div>
        <NonProtected>
          <ResetPasswordPage />
        </NonProtected>
      </div>
    ),
  },
  {
    path: "/verify-otp",
    element: (
      <div>
        <UserProtected>
          <VerifyOtpPage />
        </UserProtected>
      </div>
    ),
  },
  {
    path: "/history",
    element: (
      <div>
        <UserProtected>
          <NavbarComponent />
          <HistoryPage />
        </UserProtected>
      </div>
    ),
  },
  {
    path: "/*",
    element: (
      <div>
        <NavbarComponent />
        <NotFoundPage />
      </div>
    ),
  },
  {
    path: "/search",
    element: (
      <div>
        <NonProtected>
          <SearchingPage />
        </NonProtected>
      </div>
    ),
  },
  {
    path: "/profile",
    element: (
      <div>
        <UserProtected>
          <NavbarComponent />
          <AccountPage />
        </UserProtected>
      </div>
    ),
  },
  {
    path: "/notification",
    element: (
      <div>
        <UserProtected>
          <NavbarComponent />
          <NotificationPage />
        </UserProtected>
      </div>
    ),
  },
  {
    path: "/checkout",
    element: (
      <div>
        <UserProtected>
          <NavbarComponent />
          <CheckoutPage />
        </UserProtected>
      </div>
    ),
  },
  {
    path: "/payment",
    element: (
      <div>
        <UserProtected>
          <NavbarComponent />
          <PaymentPage />
        </UserProtected>
      </div>
    ),
  },
])

<<<<<<< HEAD
export default router
=======
export default router;
>>>>>>> 70ae3078330a6a8a148fa202605b9790b6a78bcc
