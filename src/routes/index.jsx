import { createBrowserRouter } from "react-router-dom"
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  VerifyOtpPage,
  RegisterPage,
  SearchingPage,
  ServicePage,
  AccountPage,
  NotificationPage,
  CheckoutPage,
  PaymentPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HistoryPage,
} from "../pages"
import UserProtected from "../components/Protected/Protected"
import NonProtected from "../components/Protected/NonProtected"
import NavbarComponent from "../components/Navigation/Navbar"
import PageProtected from "../components/Protected/PageProtected"

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
        {/* <PageProtected> */}
          <NonProtected>
            <NavbarComponent />
            <SearchingPage />
          </NonProtected>
        {/* </PageProtected> */}
      </div>
    ),
  },
  {
    path: "/service",
    element: (
      <div>
        <NonProtected>
          <ServicePage />
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
        {/* <PageProtected> */}
          <UserProtected>
            <NavbarComponent />
            <CheckoutPage />
          </UserProtected>
        {/* </PageProtected> */}
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

export default router
