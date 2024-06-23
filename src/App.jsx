import { useEffect } from 'react';
import { useLocation, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

import store from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import router from './routes';

function HandleScroll() {
  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById('root');

    if (['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname)) {
      root.classList.add('noScroll');
    } else {
      root.classList.remove('noScroll');
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router}>
          <HandleScroll />
          <ToastContainer theme="colored" />
        </RouterProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}
