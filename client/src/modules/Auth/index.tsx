import React, { FC, useState } from "react";
import { login, signup } from "./utils";
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

export enum Variant {
  login = "login",
  signup = "signup",
}

export interface LoginProps {
  setUser: any;
  history: any;
  variant: Variant;
}

export const Auth: FC<LoginProps> = ({setUser, history, variant}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const handleLogin = async () => {
    const data = await login(username, password);
    if (data.message) {
      setMessage(data.message);
    } else {
      setUser(data);
      history.push("/");
    }
  };

  const handleSignup = async (e: any) => {
    const data = await signup(username, password);
    if (data.message) {
      setMessage(data.message);
    } else {
      setUser(data);
      history.push("/");
    }
  };

  const handleCta = variant === Variant.login ? handleLogin : handleSignup;
  const ctaLabel = variant === Variant.login? "Login" : "Signup";

  const handleChange = (e: any) => {
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
              <Button onClick={handleCta}>{ctaLabel}</Button>
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
