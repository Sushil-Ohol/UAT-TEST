/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from "react-router-dom";
import "./navbar.css";

function Title() {
  return (
    <label>
      Constructiv<strong>IQ</strong>
    </label>
  );
}
/* Navigation Component */
function Nav() {
  return (
    <div className="navbar">
      <div className="logo">
        <Title />
      </div>
      <ul className="nav-links">
        <Link to="/projects">All Projects</Link>
      </ul>
    </div>
  );
}
export default Nav;
