import React from "react";
import { Loop } from "./elements/Loop";
import { Section, Heading2 } from "../../ui-kit";
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
        <Section>
          <Heading2>Mix</Heading2>
        </Section>
        <Controls
          onPlayBtnPress={onPlayBtnPress}
          onStopBtnPress={onStopBtnPress}
        />
        <Section>
          <Img
            src="images/CassetteRemix.svg"
            alt="Cassette"
            width="100"
            height="auto"
          />
        </Section>
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
