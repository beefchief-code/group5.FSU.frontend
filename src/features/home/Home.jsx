import { NavLink, useNavigate } from "react-router-dom";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, logout } from "../auth/authSlice";

export default function Home() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <>
      <main className="homeMain">
        <h1 className="welcome">Welcome to Fullstack University!</h1>
        <img
          className="homeImg"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Univerza_v_Ljubljani_01.jpg/640px-Univerza_v_Ljubljani_01.jpg"
          alt="Fullstack University"
        />
        <p className="homeMessage">Please use the below links to navigate:</p>
        <ul className="homeNav">
          <li className="homeLinks">
            <NavLink className="navLink" to="/departments">
              Find a Department
            </NavLink>
          </li>
          <li>
            <NavLink className="navLink" to="/professors">
              Find a Professor
            </NavLink>
          </li>
          <li>
            {token ? (
              <a className="navLink" href="#" onClick={handleLogout}>
                You are already logged in. Click to log out.
              </a>
            ) : (
              <NavLink className="navLink" to="/login">
                Login or Register for an Admin Account
              </NavLink>
            )}
          </li>
        </ul>
      </main>
    </>
  );
}
