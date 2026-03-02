import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <h2>FlowerPlant</h2>

            <nav className="nav">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/myplants">My Plants</NavLink>
            </nav>
        </header>
    );
}
