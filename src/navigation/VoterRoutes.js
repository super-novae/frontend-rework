import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  VoterForgotPassword,
  VoterHome,
  VoterLogin,
  VotingScreen,
} from "../pages";

export default function VoterRoutes() {
  const [voter, setVoter] = useState();
  return (
    <Routes>
      <Route path="voter">
        {voter ? (
          <>
            <Route index element={<VoterLogin />} />
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
