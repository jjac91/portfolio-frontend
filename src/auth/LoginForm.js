import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Card, CardBody, CardTitle, Button } from "reactstrap";

function LoginForm({login}) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }
  return (
    <div className="LoginForm">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">Login</h3>
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
            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}
            <button id="loginButton">Log In</button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginForm