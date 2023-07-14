import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from './pages/Home'
import CreatePage from './pages/CreatePage'
import { logo } from "./assets";
const App = () => {
  return (
    <Router>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link
          to={"/create-post"}
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
          Create
        </Link>
      </header>
        <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[cal(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create-post" element={<CreatePage/>}/>
          </Routes>
        </main>
    </Router>
  );
};

export default App;
