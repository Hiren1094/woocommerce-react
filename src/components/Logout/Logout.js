import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function AuthVerify() {
    const navigate = useNavigate();

    useEffect(() => {

        localStorage.removeItem("auth");
        navigate('/login');
       
    }, []);
}