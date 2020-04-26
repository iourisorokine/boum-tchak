import React from "react";
import { Row, Column, Button, Input, PageLayout, H2 } from "../../ui-kit";
import { parse } from "@fortawesome/fontawesome-svg-core";

export const SoundsList = ({ sounds, colors }) => {
  const parseSoundUrl = (soundUrl) => {
    const parts = soundUrl.split("/");
    return parts[parts.length - 1];
  };

  return (
    <React.Fragment>
      {colors &&
        colors.map((el, i) => {
          return (
            <Row>
              <Column justifyContent="flex-start">
                {i === 0 ? "Default" : `Sound ${i}`}
              </Column>
              <Column justifyContent="flex-start">
                <div
                  style={{
                    height: 20,
                    width: 20,
                    backgroundColor: el,
                  }}
                />
              </Column>
              <Column justifyContent="flex-start" flex={3}>
                {sounds[i] ? parseSoundUrl(sounds[i]) : "No sound"}
              </Column>
            </Row>
          );
        })}
    </React.Fragment>
  );
};
