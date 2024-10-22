import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h2>Welcome to Fullstack University!</h2>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Univerza_v_Ljubljani_01.jpg/640px-Univerza_v_Ljubljani_01.jpg"
        alt="Fullstack University"
      />
      <p>Please use the below links to navigate:</p>
      <NavLink to="/departments">Find a Department</NavLink>
      <NavLink to="/professors">Find a Professor</NavLink>
      <NavLink to="/login">Login or Register for an Account</NavLink>
    </>
  );
}
