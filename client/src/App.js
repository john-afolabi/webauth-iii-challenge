import React from "react";
import { Route } from "react-router-dom";
import { Container } from "reactstrap";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import NavBar from "./component/NavBar";
import Users from "./component/Users";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Route
          exact
          path="/"
          render={props => {
            return <Login {...props} />;
          }}
        />

        <Route
          exact
          path="/register"
          render={props => {
            return <Register {...props} />;
          }}
        />

        <Route
          exact
          path="/users"
          render={props => {
            return <Users {...props} />;
          }}
        />
      </Container>
    </>
  );
}

export default App;
