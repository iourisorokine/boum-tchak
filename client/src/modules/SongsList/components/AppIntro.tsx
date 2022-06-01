import React, { FC } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Column,
  Heading2,
  AppIntroLayout,
  Section,
  Heading3,
} from "../../../ui-kit";

export const AppIntro: FC = () => {
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
          <Heading2>Create simple music</Heading2>
        </Column>
      </Row>
      <Row>
        <Column justifyContent="center" alignItems="center">
          <p style={{ margin: 0, padding: 8 }}>
            An easy way to add sounds together and compose rhythmic patterns
          </p>
          <p style={{ margin: 0, padding: 8 }}>
            Scroll down to see the songs that have been posted
          </p>
          <p>You can also:</p>
        </Column>
      </Row>
      <Row>
        <Column alignItems="center">
          <Link to="/create" style={{ textDecoration: "none", color: "black" }}>
            <Section flexDirection="column" clickable>
              <Row>
                <img
                  src="images/piano-keys.svg"
                  alt="Keys"
                  width="100"
                  height="auto"
                />
              </Row>
              <Heading3>Create a Loop</Heading3>
            </Section>
          </Link>
        </Column>
        <Column alignItems="center">
          <Link to="/mix" style={{ textDecoration: "none", color: "black" }}>
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
                <Heading3>Start Mixing</Heading3>
              </Row>
            </Section>
          </Link>
        </Column>
      </Row>
      <Row>
        <Column flexDirection="row" justifyContent="center" alignItems="center">
          <FontAwesomeIcon
            // @ts-ignore:next-line
            icon={faChevronDown}
            style={chevronStyle}
            color="black"
          />
          <FontAwesomeIcon
            // @ts-ignore:next-line
            icon={faChevronDown}
            style={chevronStyle}
            color="black"
          />
          <FontAwesomeIcon
            // @ts-ignore:next-line
            icon={faChevronDown}
            style={chevronStyle}
            color="black"
          />
        </Column>
      </Row>
    </AppIntroLayout>
  );
};
