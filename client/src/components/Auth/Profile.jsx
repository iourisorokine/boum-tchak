import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "./utils";
import { Row, Column, Button, PageLayout, ProfilePic, H2 } from "../../ui-kit";

export const Profile = (props) => {
  const [message, setMessage] = useState("");

  const onLogoutBtnClick = async () => {
    await logout();
    props.setUser(null);
    props.history.push("/");
  };

  const onCreateInstrumentBtnClick = () => {
    setMessage("Coming soon, stay tuned...");
    setInterval(() => {
      setMessage("");
    }, 2000);
  };

  if (!props.user) {
    return (
      <PageLayout>
        <H2>No Profile...</H2>
        <Row>
          <Column>Please login or signup to access the profile page</Column>
        </Row>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Row>
        <Column>
          <H2>Profile</H2>
        </Column>
      </Row>
      <Row>
        <Column flex={2}>
          <ProfilePic
            src={
              "https://images.unsplash.com/photo-1502377429547-835a416e4a90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
            }
          />
        </Column>
        <Column justifyContent="flex-start" flex={3}>
          <h3>Hello, {props.user.username}</h3>
          <p>Are you ready to create some funky beats today?</p>
          <Row>
            <Link to="/load-song">
              <Button>Load Song</Button>
            </Link>
            <Button onClick={onCreateInstrumentBtnClick}>
              Create Instrument
            </Button>
            <Button onClick={onLogoutBtnClick}>Logout</Button>
          </Row>
          <Row>
            <Column>{message && <p>{message}</p>}</Column>
          </Row>
        </Column>
      </Row>
    </PageLayout>
  );
};
