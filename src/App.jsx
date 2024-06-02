import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

import store from "./redux/store";

import "react-toastify/dist/ReactToastify.css"

import router from "./routes"

export default function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />

        <ToastContainer theme="colored" />
      </GoogleOAuthProvider>
    </Provider>
  );
}