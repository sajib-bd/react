import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./LoadingModal";

const ChangePassword = ({ email, closeModal }) => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const url = `https://task-manager-mern.up.railway.app/api/v1/user/passwordReset/${email}`;

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        url,
        { code, password: newPassword },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setLoading(false);
      if (response.status === 200) {
        closeModal();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    document.title = "Forget Password";
  }, []);

  return (
    <>
      <Loading isOpen={loading} />
      <form
        onSubmit={changePasswordHandler}
        className="h-[300px] w-[300px] flex flex-col justify-center items-center bg-white bg-opacity-75 p-4 rounded-lg shadow-xl backdrop-blur-xl"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Change Password
        </h2>
        <input
          type="text"
          placeholder="Reset Code"
          required
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="New Password"
          required
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
        />
        <button
          disabled={loading}
          className="btn bg-blue-500 text-white p-2 rounded w-full"
        >
          {loading ? "Update..." : "Update"}
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
