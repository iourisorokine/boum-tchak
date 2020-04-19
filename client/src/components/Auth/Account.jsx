import React from "react";
import { logout } from "./utils";
import { Row, Column, Button } from "../../ui-kit";

export const Account = (props) => {
  const onLogoutBtnClick = async () => {
    await logout();
    props.setUser(null);
    props.history.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexStart",
      }}>
      <h2>Account</h2>
      <Row>
        <Column>
          <Button onClick={onLogoutBtnClick}>Logout</Button>
        </Column>
      </Row>
    </div>
  );
};
