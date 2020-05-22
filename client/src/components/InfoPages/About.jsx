import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Column,
  Button,
  PageLayout,
  ProfilePic,
  Heading2,
} from "../../ui-kit";

export const About = () => {
  return (
    <PageLayout>
      <Row>
        <Column>
          <Heading2>About the app</Heading2>
        </Column>
      </Row>
      <Row>
        <Column></Column>
      </Row>
    </PageLayout>
  );
};
