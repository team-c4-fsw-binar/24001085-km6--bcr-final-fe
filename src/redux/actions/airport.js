import axios from "axios";

export const getAllCity = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/api/airports/cities`,
  };

  try {
    const response = await axios.request(config);
    const { results } = response.data.data;
    return results;
  } catch (error) {
    console.error('Error get cities:', error);
    throw error;
  }
};