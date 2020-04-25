import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./utils";
import { Row, Column, Button, PageLayout, ProfilePic, H2 } from "../../ui-kit";

export const Profile = (props) => {
  const onLogoutBtnClick = async () => {
    await logout();
    props.setUser(null);
    props.history.push("/");
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
            <Column>
              <Link to="/load-song">
                <Button>Load Song</Button>
              </Link>
            </Column>
            <Column>
              <Button onClick={onLogoutBtnClick}>Logout</Button>
            </Column>
          </Row>
        </Column>
      </Row>
    </PageLayout>
  );
};
