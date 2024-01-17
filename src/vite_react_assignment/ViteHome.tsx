import { Link, Outlet } from "react-router-dom";
import "./ViteAssignment.css";
export function ViteHome() {
    return (
        <>
            <header className="homeHeaderContainer">
                <div className="homeHeadingContainer">GrowMeOrganic Assignment</div>
                <Link to={"/login"} style={{ textDecoration: "none", color: "white" }}>
                    <div className="homeLoginContainer">Login</div>
                </Link>
            </header>
            <section>
                <div><Outlet /></div>
            </section>
        </>
    )
}