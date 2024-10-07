import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "./LoadingModal";

const PrivateRoute = ({ status }) => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (status === 401) {
      setRedirect(navigate("/login"));
    }
  }, [status, navigate]);

  return <>{redirect == null ? <Loading /> : redirect}</>;
};

export default PrivateRoute;
