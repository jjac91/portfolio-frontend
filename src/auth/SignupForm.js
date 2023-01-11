import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Card, CardBody, CardTitle } from "reactstrap";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls register function prop
 * - redirects to / route
 *
 * Routes -> SignupForm
 * Routed as /signup
 */
function SignupForm({ register }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result =await register(formData);
    if (result.success){
      history.push("/");}
    else{
      setFormErrors(result.errors);
    }
  }
  return (
    <div className="SignupForm">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">Sign Up</h3>
          </CardTitle>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">User Name:</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            
            {/* {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null} */}
            <button id="signupButton">Add Item</button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignupForm;
