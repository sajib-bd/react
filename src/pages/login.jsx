import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import ForgetPassword from "../components/forgetPassword";
import ChangePassword from "../components/updatePassword";
import Loading from "../components/LoadingModal";

const url = "https://task-manager-mern.up.railway.app/api/v1";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      setLoading(true);
      const response = await axios.post(`${url}/auth/login`, data, {
        "Content-Type": "application/json",
        withCredentials: true,
      });
      if (response.data.status === "success") {
        setLoading(false);
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      if (error.status == 401) {
        toast.info("Please wait verify email is being sent");
        setLoading(false);
        try {
          setLoading(true);
          const response = await axios.post(
            `${url}/user/emailVerifyRequest/${email}`,
            {},
            { withCredentials: true }
          );
          if (response.status == 200) {
            setLoading(false);

            toast.success(response.data.message);
          }
        } catch (error) {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      }
    }
  };

  const handleForgetPasswordSuccess = (email) => {
    setIsModalOpen(false);
    setIsChangePasswordOpen(true);
    setResetEmail(email);
  };

  useEffect(() => {
    document.title = "Login";
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/user/find`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          navigate("/");
          toast.info("Already logged in");
        }
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <>
      <div className="main login h-screen w-full">
        <Loading isOpen={loading} />
        <form
          onSubmit={loginHandler}
          className="h-full w-full flex justify-center items-center"
        >
          <div className="login-card">
            <h2 className="absolute top-10 text-3xl -tracking-tightest drop-shadow-xl font-bold">
              Login
            </h2>
            <input
              type="email"
              placeholder="Email Address"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <div className="w-full">
              <h6
                onClick={() => setIsModalOpen(true)}
                className="text-sm cursor-pointer ml-4"
              >
                Forget password
              </h6>
            </div>
            <button disabled={loading} className="btn">
              {loading ? "Login..." : "Login"}{" "}
            </button>
            <p className="absolute bottom-14 cursor-pointer">
              You don't have an account? Create!
            </p>
          </div>
        </form>
      </div>

      {/* Forget Password Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ForgetPassword onSuccess={handleForgetPasswordSuccess} />
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      >
        <ChangePassword
          email={resetEmail}
          closeModal={() => setIsChangePasswordOpen(false)}
        />
      </Modal>
    </>
  );
};

export default Login;
