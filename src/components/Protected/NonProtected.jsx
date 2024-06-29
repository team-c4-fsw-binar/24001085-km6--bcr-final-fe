import axios from "axios";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const NonProtected = ({ children }) => {
  // const navigate = useNavigate()

  const getProfile = async (token) => {
    if(!token) {
      return;
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_API}/api/auth`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.request(config);
      // navigate("/")
    } catch (error) {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    getProfile(token);
  }, []);

  return children;
};

export default NonProtected;
