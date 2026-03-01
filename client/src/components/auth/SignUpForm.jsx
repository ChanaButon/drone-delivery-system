import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../api/auth-function";
import "./SignUpForm.css";

const SignUpForm = ({ onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert("You must accept the Terms & Conditions");
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    try {
      await registerUser({
        name: fullName,
        email,
        phone,
        password
      });

      const data = await loginUser({ email, password });

      if (data.user.role === "admin") {
        navigate("/adminDashboard");
      } else {
        navigate("/userDashboard");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-card-register">
      <h1>Create Account</h1>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="grid-two-columns">
          <div className="input-group">
            <label>First Name *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Last Name *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Mobile Phone *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group full-width">
          <label>Password *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
            />
            I agree to the <span className="link">Terms & Conditions</span> *
          </label>

          <label>
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={() => setMarketingOptIn(!marketingOptIn)}
            />
            I want to receive discounts and promotions
          </label>
        </div>

        <button className="cta-button" type="submit">
          Submit
        </button>

        <div className="bottom-link">
          <span>Already registered?</span>
          <button type="button" onClick={() => navigate("/login")}>
            Login here
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default SignUpForm;