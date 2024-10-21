import { NavLink } from "react-router-dom"
import "./Navbar.css"

export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink>Fullstack University</NavLink>
            <menu>
                <li>
                    <NavLink to="/departments">Departments</NavLink>
                </li>
                <li>
                    <NavLink to="/professors">Faculty</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </menu>
        </nav>
    )
}