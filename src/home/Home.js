import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./Home.css";
import UserContext from "../auth/UserContext";

function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
            <CardTitle>
                <h3 className ="font-weight-bold">
                    Welcome to Weatherly!
                </h3>
            </CardTitle>
            <h4>
                Keep track of the weather in all of your favorite places!
            </h4>
            {currentUser? 
            <p>
              Welcome Back, {currentUser.username}!
            </p>
            :
            (<p>
              <Link className="btn btn-primary font-weight-bold mr-3"
                    to="/login">
                Log in
              </Link>
              <Link className="btn btn-primary font-weight-bold"
                    to="/signup">
                Sign up
              </Link>
            </p>)}
        </CardBody>
      </Card>
    </section>
  );
}
export default Home;
