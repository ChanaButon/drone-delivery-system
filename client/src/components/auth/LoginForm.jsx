import React, { useState } from 'react';
import AuthCard from './AuthCard';
import './LoginForm.css';

const LoginForm = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', email, password);
  };

  return (
    <AuthCard title="welcome back!">
      <form className="login-form" onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email or Phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='button-submit' type="submit">Login</button>
        <div className="switch-link">
          <span>Don't have an account?</span>
          <button type="button" onClick={onSwitchToSignUp}>Sign Up</button>
        </div>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
