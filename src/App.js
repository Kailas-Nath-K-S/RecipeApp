import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
