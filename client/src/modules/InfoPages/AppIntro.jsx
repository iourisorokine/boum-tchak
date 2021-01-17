import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { 
  Row, 
  Column, 
  Heading2, 
  AppIntroLayout, 
  Section, 
  Heading3
} from "../../ui-kit";

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
          <p>
            What do you want to do?
          </p>
        </Column>
      </Row>
      <Row>
        <Link to="/create" style={{textDecoration: 'none', color: 'black'}}>
          <Section flexDirection="column" clickable>
            <Row>
              <img
                src="images/piano-keys.svg"
                alt="Keys"
                width="100"
                height="auto"
              />
            </Row>
            <Heading3>
              Create a Loop
            </Heading3>
          </Section>
        </Link>
        <Link to="/mix" style={{textDecoration: 'none', color: 'black'}}>
          <Section flexDirection="column" clickable>
            <Row>
              <img
                src="images/CassetteRemix.svg"
                alt="Cassette"
                width="100"
                height="auto"
              />
            </Row>
            <Row>
              <Heading3>
                Start Mixing
              </Heading3>
            </Row>
          </Section>
        </Link>
      </Row>
      <Row>
        <Column>
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
