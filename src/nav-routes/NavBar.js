import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/newlocation">
            New Location
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/locations">
            Saved Locations
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.username}
          </Link>
          {/* <Link className="nav-link" to="/profile">
            {currentUser.username}'s profile
          </Link> */}
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }
  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Weatherly
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

//   <div>
//   <Navbar expand="md">
//     <NavLink exact to="/" className="navbar-brand">
//       The App
//     </NavLink>

//     <Nav className="ml-auto" navbar>
//     <NavItem>
//         <NavLink to="/login">Login</NavLink>
//       </NavItem>
//       <NavItem>
//         <NavLink to="/signgup">Sign Up</NavLink>
//       </NavItem>
//     </Nav>
//   </Navbar>
// </div>

export default NavBar;
