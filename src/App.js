import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Budgetisation from "./pages/Budgetisation";
import Calendrier from "./pages/Calendrier";
import Jour from "./pages/Jour";
import Resume from "./pages/Resume";
import "./styles/globals.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Resume />} />
            <Route path="/calendrier" element={<Calendrier />} />
            <Route path="/depenses/:type/:date" element={<Jour />} />
            <Route path="/budgetisation" element={<Budgetisation />} />
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
