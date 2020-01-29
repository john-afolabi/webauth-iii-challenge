import React, { useState } from "react";
import { Form, Label, Input, Button, FormGroup } from "reactstrap";
import axios from "axios";

const user = {
  username: "",
  password: ""
};

function Login() {
  const [formValues, setFormValues] = useState(user);

  const onInputChange = event => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/users/login", formValues)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" onChange={onInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" onChange={onInputChange} />
        </FormGroup>
        <Button onClick={onSubmit} color="success">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
