import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Row, Column, Heading2, AppIntroLayout, Button } from "../../ui-kit";

export const AppIntro = () => {
  const chevronStyle = {
    padding: 4,
    paddingTop: 32,
    width: 40,
    height: 40,
  };
  return (
    <AppIntroLayout>
      <Row>
        <Column justifyContent="center" alignItems="center">
          <Heading2>Welcome to Boom-Tchak!</Heading2>
        </Column>
      </Row>
      <Row>
        <Column justifyContent="center" alignItems="center">
          <p style={{ margin: 0, padding: 8 }}>
            The app to discover and create nice music loops.
          </p>
          <p style={{ margin: 0, padding: 0 }}>
            Want to start creating music? It's here >>{" "}
            <Link to="/create">
              <Button>Create</Button>
            </Link>
          </p>
          <p style={{ margin: 0, padding: 0 }}>
            Need help? This way >>{" "}
            <Link to="/help">
              <Button>Help</Button>
            </Link>
          </p>
          <p style={{ margin: 0, padding: 8 }}>
            To check out some nice music loops, scroll down and click on the
            songs
          </p>
        </Column>
      </Row>
      <Row>
        <Column flexDirection="row" justifyContent="center" alignItems="center">
          <FontAwesomeIcon
            icon={faChevronDown}
            style={chevronStyle}
            color="black"
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            style={chevronStyle}
            color="black"
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            style={chevronStyle}
            color="black"
          />
        </Column>
      </Row>
    </AppIntroLayout>
  );
};
