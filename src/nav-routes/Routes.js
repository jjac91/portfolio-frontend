import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../home/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import NewLocation from "../locations/NewLocation";
import ProtectedRoute from "./ProtectedRoute";
import SavedLocationsList from "../locations/SavedLocationsList";
import LocationDetails from "../locations/LocationDetails";

/** Site-wide routes.
 *
 * Parts of the site should only be accessible when logged in. Those routes are
 * wrapped by <ProtectedRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */
function Routes({ login, register }) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/signup">
        <SignupForm register={register} />
      </Route>

      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>

      <ProtectedRoute exact path="/newLocation">
        <NewLocation />
      </ProtectedRoute>

      <ProtectedRoute exact path="/location/:username/:id">
        <LocationDetails />
      </ProtectedRoute>

      <ProtectedRoute exact path="/locations">
        <SavedLocationsList />
      </ProtectedRoute>

      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
