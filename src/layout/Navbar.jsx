import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { logout, selectToken } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }
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
          {token ? (
            <a className="navBarLink" href="#" onClick={handleLogout}>
              Log Out
            </a>
          ) : (
            <NavLink className="navBarLink" to="/login">
              Login
            </NavLink>
          )}
        </li>
      </menu>
    </nav>
  );
}
