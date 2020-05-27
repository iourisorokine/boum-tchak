import React from "react";
import { Row, Column, Heading2, AppIntroLayout } from "../../ui-kit";

export const AppIntro = () => {
  return (
    <AppIntroLayout>
      <Row>
        <Column></Column>
        <Column flex={2} justifyContent="center" alignItems="center">
          <Heading2>Welcome to Boom-Tchak!</Heading2>
        </Column>
        <Column></Column>
      </Row>
      <Row>
        <Column></Column>
        <Column flex={2} justifyContent="center" alignItems="center">
          <p>
            The app to discover and create nice music loops. Scroll down to
            check out the last creations and listen by clicking on them.
          </p>
          <p>Click on "create" to create your own music loop</p>
          <p>Sign-up to be able to save and post your creations</p>
        </Column>
        <Column></Column>
      </Row>
    </AppIntroLayout>
  );
};
