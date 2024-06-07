import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();

  const getProfile = async (token) => {
    if(!token) {
      return (navigate("/login"));
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
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    getProfile(token);
  }, []);

  return children;
};

export default Protected;
