import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UserContext from "../auth/UserContext";

function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="Homepage">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 text-center">
        <div className="card">
          <h1 className="mb-4 font-weight-bold">Weather Advisor</h1>
          <p className="lead font-weight-bold">
            Track the weather in your favorite places and get advice on it
          </p>
          {currentUser ? (
            <h2>Welcome Back, {currentUser.username}!</h2>
          ) : (
            <p className="mt-4 ">
              <Link
                className="btn btn-primary font-weight-bold mr-3"
                to="/login"
              >
                Log in
              </Link>
              <Link className="btn btn-primary font-weight-bold" to="/signup">
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
