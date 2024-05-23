import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  OTPPage,
  RegisterPage,
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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
