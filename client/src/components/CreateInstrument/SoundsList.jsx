import React from "react";
import { Row, Column, ColorSquare, Button, Heading2 } from "../../ui-kit";

export const SoundsList = ({ sounds, colors, addSound }) => {
  const parseSoundUrl = (soundUrl) => {
    const parts = soundUrl.split("/");
    return parts[parts.length - 1];
  };

  const playSound = (sound) => {
    new Audio(sound).play();
  };

  return (
    <React.Fragment>
      {sounds &&
        sounds.map((el, i) => {
          return (
            <Row key={i}>
              <Column>
                <p style={{ margin: 0, padding: "5px 0" }}>
                  {i === 0 ? "Default" : `${i}`}
                </p>
              </Column>
              <Column>
                <ColorSquare backgroundColor={colors[i]} />
              </Column>
              <Column flex={5}>
                {el ? (
                  <Button onClick={() => playSound(el)}>
                    {parseSoundUrl(el)}
                  </Button>
                ) : (
                  <p style={{ margin: 0, padding: "5px 18px" }}>No sound</p>
                )}
              </Column>
            </Row>
          );
        })}
      <Row>
        <Column flex={2}></Column>
        <Column justifyContent="flex-start" flex={5}>
          <Button backgroundColor="#0f0" onClick={addSound}>
            Add Sound
          </Button>
        </Column>
      </Row>
    </React.Fragment>
  );
};
