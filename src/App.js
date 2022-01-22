import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./layouts/BlackAndGold/pages/index/Index";
import Admin from "./layouts/BlackAndGold/pages/admin/Admin";

import FontStyles from './fonts/fonts';

function App() {
  return (
    <Router>
      <FontStyles />
      <Routes>
        <Route exact path="/" element={<Index/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
  );
}

export default App;
