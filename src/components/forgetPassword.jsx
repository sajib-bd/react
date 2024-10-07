import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./LoadingModal";

const ForgetPassword = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const url = `https://task-manager-mern.up.railway.app/api/v1/user/emailCode/${email}`;

  const forgetPasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      toast.success(response.data.message);
      setLoading(false);
      if (response.status === 200) {
        onSuccess(email);
      }
    } catch (error) {
      setLoading(false);
      toast.info(error.response.data.message);
    }
  };

  useEffect(() => {
    document.title = "Forget Password";
  }, []);

  return (
    <>
      <Loading isOpen={loading} />
      <form
        onSubmit={forgetPasswordHandler}
        className="h-[300px] w-[300px] flex flex-col justify-center items-center bg-white bg-opacity-75 p-4 rounded-lg shadow-xl backdrop-blur-xl"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Forget Password
        </h2>
        <input
          type="email"
          placeholder="Email Address"
          required
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button
          disabled={loading}
          className="btn bg-blue-500 text-white p-2 rounded w-full"
        >
          {loading ? "Submit..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default ForgetPassword;
