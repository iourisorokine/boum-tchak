import React, { useState } from "react";
import { login } from "./utils";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  PageLayout,
  Label,
  Row,
  Column,
  Alert,
  Heading2,
  BlankSpace,
} from "../../ui-kit";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const handleLogin = async () => {
    const data = await login(username, password);
    if (data.message) {
      setMessage(data.message);
    } else {
      props.setUser(data);
      props.history.push("/");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <PageLayout>
      <Row>
        <Column />
        <Column flex={1}>
          <Heading2>Login</Heading2>
          <Row>
            <Column>
              <Label htmlFor="username">Username:</Label>
            </Column>
            <Column flex={2}>
              <Input
                type="text"
                name="username"
                width={"100%"}
                id="username"
                value={username}
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
                width={"100%"}
                id="password"
                value={password}
                onChange={handleChange}
              />
            </Column>
          </Row>
          <BlankSpace />
          <Row>
            <Column alignItems={"center"}>
              {message && <Alert>{message}</Alert>}
              <Button onClick={handleLogin}>Login</Button>
              <p>No profile yet?</p>
              <Link to="/signup" style={linkStyle}>
                signup
              </Link>
            </Column>
          </Row>
        </Column>
        <Column />
      </Row>
    </PageLayout>
  );
};
