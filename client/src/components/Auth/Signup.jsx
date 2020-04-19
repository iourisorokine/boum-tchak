import React, { useState } from "react";
import { Input, Button, Form, Label, Row, Column, Alert } from "../../ui-kit";
import { signup } from "./utils";

export const Signup = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(userName, password).then((data) => {
      if (data.message) {
        setMessage(data.message);
      } else {
        props.setUser(data);
        props.history.push("/");
      }
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUserName(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexStart",
      }}>
      <h4>Signup</h4>
      <Form width={300} onsubmit={handleSubmit}>
        <Row>
          <Column flex={1}>
            <Label htmlFor="username">Username:</Label>
          </Column>
          <Column flex={2}>
            <Input
              type="text"
              name="username"
              id="username"
              value={userName}
              onChange={handleChange}
            />
          </Column>
        </Row>
        <Row>
          <Column flex={1}>
            <Label htmlFor="password">Password:</Label>
          </Column>
          <Column flex={2}>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
            />
          </Column>
        </Row>
        <Row>
          <Column alignItems={"center"}>
            {message && <Alert>{message}</Alert>}
          </Column>
        </Row>
        <Row>
          <Column alignItems={"center"}>
            <Button type="submit">Submit</Button>
          </Column>
        </Row>
      </Form>
    </div>
  );
};
