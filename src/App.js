import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SuperUserRoutes, AdminRoutes, VoterRoutes } from "./navigation";

function App() {
  return (
    <>
      <Router>
        <SuperUserRoutes />
        <AdminRoutes />
        <VoterRoutes />
      </Router>
    </>
  );
}

export default App;
