import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import {
  VoterForgotPassword,
  VoterHome,
  VoterLogin,
  VotingScreen,
} from "../pages";

import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from "../util/local-storage.util";

import { voterLogin } from "../api/voter/voter-api";

export default function VoterRoutes() {
  const [voter, setVoter] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const voter = getLocalStorage("VOTER");
    if (voter) {
      setVoter(voter);
    }
  }, []);

  const handleVoterLogin = async (email, password) => {
    const voter = await voterLogin(email, password);
    if (voter) {
      setVoter(voter);
      const voterObject = {
        token: voter.auth_token,
        voterId: voter.id,
        organizationId: voter.organization_id,
      };
      setLocalStorage("VOTER", JSON.stringify(voterObject));
    }
  };

  const handleVoterLogout = () => {
    deleteLocalStorage("VOTER");
    setVoter(null);
    navigate("/voter");
  };

  return (
    <Routes>
      <Route path="voter">
        {!voter ? (
          <>
            <Route index element={<VoterLogin login={handleVoterLogin} />} />
            <Route path="forgot-password" element={<VoterForgotPassword />} />
          </>
        ) : (
          <>
            <Route index element={<VoterHome logout={handleVoterLogout} />} />
            <Route
              path="elections/:electionId"
              element={<VotingScreen logout={handleVoterLogout} />}
            />
          </>
        )}
      </Route>
    </Routes>
  );
}
