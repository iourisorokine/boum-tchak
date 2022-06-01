import React from "react";
import { Loop } from "./elements/Loop";
import { Section, Heading2, Row, Column, AppIntroLayout } from "../../ui-kit";
import { Controls } from "./elements/Controls";

export const MixMode = ({
  loop1,
  loop2,
  loop3,
  loop4,
  onPlayBtnPress,
  onStopBtnPress,
  toggleLoopActive,
  toggleActiveNote,
  highlightedNote,
}) => {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <AppIntroLayout>
          <Row>
            <Column>
              <Row>
                <Column>
                  <Heading2>Mix</Heading2>
                </Column>
                <Column>
                  <img
                    src="images/CassetteRemix.svg"
                    alt="Cassette"
                    width="100"
                    height="auto"
                  />
                </Column>
              </Row>
            </Column>
            <Column>
              <p>
                This is where you can play live by overlapping different loops.
                Each loop can be edited manually or randomly generated
              </p>
            </Column>
          </Row>
        </AppIntroLayout>

        <Controls
          onPlayBtnPress={onPlayBtnPress}
          onStopBtnPress={onStopBtnPress}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Loop
          data={loop1}
          toggleActiveNote={toggleActiveNote}
          highlightedNote={highlightedNote}
          toggleLoopActive={toggleLoopActive}
        />
        <Loop
          data={loop2}
          toggleActiveNote={toggleActiveNote}
          highlightedNote={highlightedNote}
          toggleLoopActive={toggleLoopActive}
        />
        <Loop
          data={loop3}
          toggleActiveNote={toggleActiveNote}
          highlightedNote={highlightedNote}
          toggleLoopActive={toggleLoopActive}
        />
        <Loop
          data={loop4}
          toggleActiveNote={toggleActiveNote}
          highlightedNote={highlightedNote}
          toggleLoopActive={toggleLoopActive}
        />
      </div>
    </div>
  );
};
