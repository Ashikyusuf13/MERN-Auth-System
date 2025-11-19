import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Login from "./Login";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-transparent px-10 py-10">
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
