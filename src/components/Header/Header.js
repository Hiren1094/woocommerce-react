import React from "react";
import { Link } from "react-router-dom";
import IsUserLogin from "../Login/IsUserLogin";

export default function Header() {

    const LoginSession = IsUserLogin();

    return (
        <div className="header" style={{ width: "95%",textAlign: "right"}}>
            <ul>
                <li style={{ display: "inline", margin: "11px" }}>
                    <Link to='/'>
                        <span>Home</span>
                    </Link>
                </li>
                <li style={{ display: "inline", margin: "11px" }}>
                    <Link to='/cart'>
                        <span>Cart</span>
                    </Link>
                </li>
                <li style={{ display: "inline", margin: "11px" }}>
                    { LoginSession == false ?
                    <Link to='/login'>
                        <span>Login</span>
                    </Link>
                    : <Link to='/logout'>
                        <span>Log out</span>
                    </Link>
                    }
                </li>
            </ul>
        </div>
    )
}