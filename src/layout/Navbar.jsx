import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink className="navBarLink" to="/">
        Fullstack University
      </NavLink>
      <menu>
        <li>
          <NavLink className="navBarLink" to="/departments">
            Departments
          </NavLink>
        </li>
        <li>
          <NavLink className="navBarLink" to="/professors">
            Faculty
          </NavLink>
        </li>
        <li>
          <NavLink className="navBarLink" to="/login">
            Login
          </NavLink>
        </li>
      </menu>
    </nav>
  );
}
