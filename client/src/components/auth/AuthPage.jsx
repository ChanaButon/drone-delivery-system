import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Navbar from "../Navbar/Navbar.jsx";
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    
    <div className="auth-page"> 
    <Navbar />
      {isLogin ? (
        <LoginForm onSwitchToSignUp={() => setIsLogin(false)} />
      ) : (
        <SignUpForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthPage;
