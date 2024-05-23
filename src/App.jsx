import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RiwayatPage from "./pages/RiwayatPemesanan";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RiwayatPage />
      </>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
