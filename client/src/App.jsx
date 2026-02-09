import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import './index.css';

function App() {
    return (
    <div className="min-h-screen font-sans text-left" dir="ltr">

      <Hero />
      <Features />
    </div>
  );
}

export default App;
