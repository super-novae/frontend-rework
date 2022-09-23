import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import {
  AdminHome,
  AdminElection,
  AdminElectionOffice,
  AdminElectionOffices,
  AdminLogin,
  AdminVoter,
} from "../pages";

import { administratorLogin } from "../api/auth/admin";
import {
  getLocalStorage,
  setLocalStorage,
  deleteLocalStorage,
} from "../util/local-storage.util";

export default function AdminRoutes() {
  const [admin, setAdmin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const admin = getLocalStorage("ADMIN");
    if (admin) {
      setAdmin(admin);
    }
  }, []);

  const handleAdminLogin = async (email, password) => {
    const admin = await administratorLogin(email, password);
    if (admin) {
      setAdmin(admin);
      const adminObject = { token: admin.auth_token, adminId: admin.id };
      setLocalStorage("ADMIN", JSON.stringify(adminObject));
    }
  };

  const handleAdminLogout = () => {
    deleteLocalStorage("ADMIN");
    setAdmin(null);
    navigate("/admin");
  };

  return (
    <Routes>
      <Route path="admin">
        {!admin ? (
          <Route index element={<AdminLogin login={handleAdminLogin} />} />
        ) : (
          <>
            <Route index element={<AdminHome logout={handleAdminLogout} />} />
            <Route
              path="elections"
              element={<AdminElection logout={handleAdminLogout} />}
            />
            <Route
              path="voters"
              element={<AdminVoter logout={handleAdminLogout} />}
            />
            <Route
              path="elections/:id"
              element={<AdminElectionOffices logout={handleAdminLogout} />}
            />
            <Route
              path="elections/:electionId/offices/:officeId"
              element={<AdminElectionOffice logout={handleAdminLogout} />}
            />
          </>
        )}
      </Route>
    </Routes>
  );
}
