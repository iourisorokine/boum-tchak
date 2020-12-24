import React from "react";
import { MenuButton, Section, AverageEditBtn, Caption } from "../../ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { Loop } from "./elements/Loop";

const LENGTH_OF_PAGE = 16;

const iconStyle = { width: 16, height: 16 };

export const DJMode = ({
  loop1,
  loop2,
  loop3,
  loop4,
  isPlaying,
  onPlayBtnPress,
  onStopBtnPress,
  toggleLoopActive,
  toggleActiveNote,
  highlightedNote,
  resetPartition,
  tempo,
  onMinusTempoPress,
  onPlusTempoPress,
}) => {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <h2>Mix</h2>
        </div>
        <Section>
          {isPlaying ? (
            <MenuButton onClick={onStopBtnPress} backgroundColor="#f00">
              <FontAwesomeIcon icon={faStop} color="white" style={iconStyle} />
            </MenuButton>
          ) : (
            <MenuButton onClick={onPlayBtnPress} backgroundColor="#0f0">
              <FontAwesomeIcon icon={faPlay} color="white" style={iconStyle} />
            </MenuButton>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AverageEditBtn onClick={onMinusTempoPress}>-</AverageEditBtn>
            <Caption>tempo: {tempo}</Caption>
            <AverageEditBtn onClick={onPlusTempoPress}>+</AverageEditBtn>
          </div>
        </Section>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Loop
          data={loop1}
          toggleActiveNote={toggleActiveNote}
          highlightedNote={highlightedNote}
          lengthOfPage={LENGTH_OF_PAGE}
          toggleLoopActive={toggleLoopActive}
          resetPartition={resetPartition}
        />
        <Loop
          data={loop2}
          toggleActiveNote={toggleActiveNote}
          highlightedNote={highlightedNote}
          lengthOfPage={LENGTH_OF_PAGE}
          toggleLoopActive={toggleLoopActive}
          resetPartition={resetPartition}
        />
        <Loop
          data={loop3}
          toggleActiveNote={toggleActiveNote}
          highlightedNote={highlightedNote}
          lengthOfPage={LENGTH_OF_PAGE}
          toggleLoopActive={toggleLoopActive}
          resetPartition={resetPartition}
        />
        <Loop
          data={loop4}
          toggleActiveNote={toggleActiveNote}
          highlightedNote={highlightedNote}
          lengthOfPage={LENGTH_OF_PAGE}
          toggleLoopActive={toggleLoopActive}
          resetPartition={resetPartition}
        />
      </div>
    </div>
  );
};
