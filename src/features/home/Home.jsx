import { NavLink } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <>
      <main className="homeMain">
        <h1 className="welcome">Welcome to Fullstack University!</h1>
        <img
          className="homeImg"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Univerza_v_Ljubljani_01.jpg/640px-Univerza_v_Ljubljani_01.jpg"
          alt="Fullstack University"
        />
        <p className="homeMessage">Please use the below links to navigate</p>
        <ul className="homeNav">
          <li className="homeLinks">
            <NavLink to="/departments">Find a Department</NavLink>
          </li>
          <li>
            <NavLink to="/professors">Find a Professor</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login or Register for an Account</NavLink>
          </li>
        </ul>
      </main>
    </>
  );
}
