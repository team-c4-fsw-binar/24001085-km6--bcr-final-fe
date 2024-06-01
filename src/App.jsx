import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  OTPPage,
  RegisterPage,
  PaymentPage,
} from "./pages";

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
    element: <OTPPage />,
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
