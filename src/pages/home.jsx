import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingModal from "../components/LoadingModal";
const url = "https://task-manager-mern.up.railway.app/api/v1";

const Home = () => {
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";

    (async () => {
      try {
        const response = await axios.get(`${url}/user/find`, {
          withCredentials: true,
        });
        setUserdata(response.data.userInfo);
      } catch (e) {
        if (e.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <>
      <div className="login">
        <LoadingModal isOpen={loading} />
        <div className="flex h-screen w-full justify-center items-center">
          {userdata == null ? (
            ""
          ) : (
            <h1 className="text-5xl">{userdata.name}</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
