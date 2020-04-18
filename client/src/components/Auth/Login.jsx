import React from "react";
import { Input, Button, Form, Label, Row, Column } from "../../ui-kit";

export const Login = () => {
  const handleSubmit = () => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexStart",
      }}>
      <h4>Login</h4>
      <Form width={300} onsubmit={handleSubmit}>
        <Row>
          <Column flex={1}>
            <Label>Username:</Label>
          </Column>
          <Column flex={2}>
            <Input type="text" />
          </Column>
        </Row>
        <Row>
          <Column flex={1}>
            <Label>Password:</Label>
          </Column>
          <Column flex={2}>
            <Input type="password" />
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
