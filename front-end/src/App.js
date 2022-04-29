import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Movements from "./pages/Movements";
import LittleNav from "./components/LittleNav";

function App() {
  const App = () => (
    <div>
      <LittleNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movements" element={<Movements />} />
      </Routes>
    </div>
  );
  return <App />;
}

export default App;
