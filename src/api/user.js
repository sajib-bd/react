import create from "zustand";
import axios from "axios";

const userApi = create((set) => ({
  data: null,
  error: null,
  Login: async () => {
    const url = "https://task-manager-mern.up.railway.app/api/v1/auth/login";
    const response = await axios.post(url);
  },
}));

export default userApi;
