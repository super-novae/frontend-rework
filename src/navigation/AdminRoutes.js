import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  AdminHome,
  AdminElection,
  AdminElectionOffice,
  AdminElectionOffices,
  AdminLogin,
  AdminVoter,
} from "../pages";

export default function AdminRoutes() {
  const [admin, setAdmin] = useState();
  return (
    <Routes>
      <Route path="admin">
        {admin ? (
          <Route index element={<AdminLogin />} />
        ) : (
          <>
            <Route index element={<AdminHome />} />
            <Route path="elections" element={<AdminElection />} />
            <Route path="voters" element={<AdminVoter />} />
            <Route path="elections/:id" element={<AdminElectionOffices />} />
            <Route
              path="elections/offices/:id"
              element={<AdminElectionOffice />}
            />
          </>
        )}
      </Route>
    </Routes>
  );
}
