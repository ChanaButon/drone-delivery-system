import React from "react";
import { ArrowRight } from "lucide-react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <h1>
            The Future of Delivery <br />
            <span>The Lands at Your Door</span>
          </h1>
          <p>
            Transport packages between businesses, friends, and family with lightning speed. The most advanced autonomous drone service.
          </p>
          <button className="how-it-works-btn">
            How it Works? <ArrowRight size={20} />
          </button>
        </div>
        <div className="hero-right">
          <div className="hero-drone-card">
           
            <div className="drone-info">
              <div>
                <p>Package en route</p>
                <p>Distance: 2.4 km</p>
              </div>
              <div className="status-badge">Active</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
