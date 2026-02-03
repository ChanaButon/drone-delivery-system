import React from "react";
import { MapPin, ShieldCheck, Zap } from "lucide-react";
import "./Features.css";

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        <div className="feature-card">
          <div className="feature-icon bg-blue-600">
            <Zap />
          </div>
          <h3>Ultra Fast</h3>
          <p>Urban deliveries in under 15 minutes. No traffic, no delays.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon bg-green-600">
            <ShieldCheck />
          </div>
          <h3>Maximum Safety</h3>
          <p>Real-time monitoring of every drone and package with full encryption.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon bg-purple-600">
            <MapPin />
          </div>
          <h3>Precision Landing</h3>
          <p>Accurate landing on balconies, yards, or designated pickup points.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
