import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Component_2_Json } from "./JSON_Component2/Component_2_JSON";

export function LoginHome() {
    var navigate = useNavigate();
    var userAuthToken: any = localStorage.getItem("loginToken");

    //Logout Function..
    function HandleLogoutClick() {
        localStorage.removeItem("loginToken");
        navigate("/login");
    }

    //Some Function on Mount..
    useEffect(() => {
        if (JSON.parse(userAuthToken) == null) {
            navigate("/login");
        }
    }, [])
    return (
        <>
            <header className="homeHeaderContainer">
                <div className="homeHeadingContainer">GrowMeOrganic Assignment</div>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <div style={{ fontSize: "1.2em", marginRight: "0.8em" }}>Welcome to Home Page- <span style={{ color: "green" }}>{JSON.parse(userAuthToken) == null ? '' : JSON.parse(userAuthToken).name.toUpperCase()}</span></div>
                    <div onClick={HandleLogoutClick} className="homeLogoutContainer">Logout</div>
                </div>
            </header>
            <section>
                <div>
                    <Outlet />
                </div>
                <div>
                    <Component_2_Json />
                </div>
            </section>
        </>
    )
}