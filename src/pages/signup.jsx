import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/LoadingModal";

const url = "https://task-manager-mern.up.railway.app/api/v1";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${url}/auth/signup`, formData, {
        "Content-Type": "application/json",
        withCredentials: true,
      });
      if (response.data.status === "success") {
        setLoading(false);
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.title = "Registration";
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
              Sign Up
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="input"
              value={formData.name}
              onChange={changeHandler}
              minLength={5}
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="input"
              value={formData.email}
              onChange={changeHandler}
              disabled={loading}
            />
            <input
              type="number"
              name="mobile"
              placeholder="Phone Number"
              required
              className="input"
              value={formData.mobile}
              onChange={changeHandler}
              disabled={loading}
              minLength={11}
              maxLength={11}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input"
              value={formData.password}
              onChange={changeHandler}
              disabled={loading}
            />
            <button disabled={loading} className="btn mt-6">
              {loading ? "SignUp..." : "Sign Up"}{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
