import React from "react";
import { logout } from "./utils";
import { Row, Column, Button } from "../../ui-kit";

export const Profile = (props) => {
  const onLogoutBtnClick = async () => {
    await logout();
    props.setUser(null);
    props.history.push("/");
  };

  if (!props.user) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flexStart",
        }}>
        <h2>No Profile...</h2>
        <Row>
          <Column>Please login or signup to access the profile page</Column>
        </Row>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexStart",
      }}>
      <h2>Profile</h2>
      <Row>
        <Column>
          <h3>Hello, {props.user.username}</h3>
        </Column>
      </Row>
      <Row>
        <Column>
          <Button onClick={onLogoutBtnClick}>Logout</Button>
        </Column>
      </Row>
    </div>
  );
};
