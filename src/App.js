import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  SuperUserLogin,
  SuperUserHome,
  SuperUserOrganization,
  AdminLogin,
  AdminHome,
  AdminElection,
  AdminElectionOffices,
  AdminElectionOffice,
  AdminVoter,
  VoterLogin,
  VoterForgotPassword,
  VoterHome,
  VotingScreen,
} from "./pages";

function App() {
  const [user, setUser] = useState();
  return (
    <>
      <Router>
        <Routes>
          <Route path="superuser">
            {user ? (
              <Route index element={<SuperUserLogin />} />
            ) : (
              <>
                <Route index element={<SuperUserHome />} />
                <Route
                  path="organization/:id"
                  element={<SuperUserOrganization />}
                />
              </>
            )}
          </Route>
          <Route path="admin">
            {user ? (
              <Route index element={<AdminLogin />} />
            ) : (
              <>
                <Route index element={<AdminHome />} />
                <Route path="elections" element={<AdminElection />} />
                <Route path="voters" element={<AdminVoter />} />
                <Route
                  path="elections/:id"
                  element={<AdminElectionOffices />}
                />
                <Route
                  path="elections/offices/:id"
                  element={<AdminElectionOffice />}
                />
              </>
            )}
          </Route>
          <Route path="voter">
            {user ? (
              <>
                <Route index element={<VoterLogin />} />
                <Route
                  path="forgot-password"
                  element={<VoterForgotPassword />}
                />
              </>
            ) : (
              <>
                <Route index element={<VoterHome />} />
                <Route path="voting" element={<VotingScreen />} />
              </>
            )}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
