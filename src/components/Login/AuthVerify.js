import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import IsUserLogin from "./IsUserLogin";

const AuthVerify = ({ children }) => {
    const auth = localStorage.getItem('auth');
    const navigate = useNavigate();
    useEffect(() => {

        if (IsUserLogin() == false) {

            navigate('/login');
        }

    }, []);
    return children;
};
export default AuthVerify;