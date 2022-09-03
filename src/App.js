import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SuperUserLogin, SuperUserHome, SuperUserOrganization } from "./pages";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
