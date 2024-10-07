import { useState } from "react";
import Loading from "./LoadingModal";
import axios from "axios";

const LogoutButton = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = "https://task-manager-mern.up.railway.app/api/v1";

  const handleLogoutClick = () => {
    setShowDialog(true);
  };

  const handleConfirmLogout = async () => {
    setShowDialog(false);
    try {
      setLoading(true);
      const response = await axios.post(`${url}/user/logout`);
    } catch (error) {}
  };

  const handleCancelLogout = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <button onClick={handleLogoutClick} className="btn">
        Logout
      </button>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-transparent p-4 rounded-2xl shadow-xl backdrop-blur-2xl border font-bold text-xl">
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleConfirmLogout}
                className="order px-16 py-2 backdrop-blur-md rounded-full 
                           text-xl text-white mr-2 border bg-green-500"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelLogout}
                className="order px-16 py-2 backdrop-blur-md rounded-full 
                           text-xl text-white border bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
