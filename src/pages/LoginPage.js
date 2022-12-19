import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import { useNavigate } from 'react-router-dom';
import IsUserLogin from "../components/Login/IsUserLogin";

export default function LoginPage() {
  
  const navigate = useNavigate();

  useEffect(() => {
    
    if (IsUserLogin() == true) {
        
        navigate('/');
    }
    
  }, []);

  return (
    <div className="page-container">
      <h1>Login</h1>
      <Login />
    </div>
  );
}
