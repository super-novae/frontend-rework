import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  VoterForgotPassword,
  VoterHome,
  VoterLogin,
  VotingScreen,
} from "../pages";

import { voterLogin } from "../api/voter/voter-api";

export default function VoterRoutes() {
  const [voter, setVoter] = useState();
  const handleVoterLogin = async (email, password) => {
    const voter= await voterLogin(email, password);
    if (voter) {
      setVoter(voter);
      const voterObject = { token: voter.auth_token, voterId: voter.id };
      setLocalStorage("VOTER", JSON.stringify(voterObject));
    }
  }
  return (
    <Routes>
      <Route path="voter">
        {!voter ? (
          <>
            <Route index element={<VoterLogin login={handleVoterLogin}/>} />
            <Route path="forgot-password" element={<VoterForgotPassword />} />
          </>
        ) : (
          <>
            <Route index element={<VoterHome />} />
            <Route path="voting" element={<VotingScreen />} />
          </>
        )}
      </Route>
    </Routes>
  );
}
