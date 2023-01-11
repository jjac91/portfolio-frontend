import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Redirect, Route } from "react-router-dom";

/** Higher order component to handle protected routes
 * 
 * Use this instead of <Route..> in routing componenents where
 * user access should be limited.  Checks if the current user is valid
 * and only coninues on to the route if valid. If no user is present
 * redirects to login form
 */
function ProtectedRoute({ ...props }) {
  const {currentUser} = useContext(UserContext);
  return currentUser? <Route {...props}/> : <Redirect to="/login" />;
}

export default ProtectedRoute