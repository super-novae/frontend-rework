import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { SuperUserLogin, SuperUserHome, SuperUserOrganization } from "../pages";
import { superuser_login } from "../api/auth/superuser";

export default function SuperUserRoutes() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const super_user_token = localStorage.getItem(
      process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
    );
    if (super_user_token) {
      setUser(super_user_token);
    } else {
      setUser(null);
    }
  }, []);

  const loginHandler = async (username, password) => {
    const res = await superuser_login(username, password);
    if (res) {
      localStorage.setItem(
        process.env.REACT_APP_SUPER_USER_LS_KEY.toString(),
        res.auth_token
      );
      setUser(res.auth_token);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(
        process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
      );
      setUser(null);
      navigate("/superuser");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Routes>
      <Route path="superuser">
        {!user ? (
          <Route
            index
            element={<SuperUserLogin loginHandler={loginHandler} />}
          />
        ) : (
          <>
            <Route index element={<SuperUserHome logout={logout} />} />
            <Route
              path="organization/:id"
              element={<SuperUserOrganization logout={logout} />}
            />
          </>
        )}
      </Route>
    </Routes>
  );
}
