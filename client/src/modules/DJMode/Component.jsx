import React from "react";
import { MenuButton } from "../../ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { Loop } from "./elements/Loop";

const LENGTH_OF_PAGE = 8;

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
  toggleActiveNote2,
  toggleActiveNote3,
  toggleActiveNote4,
  highlightedNote,
}) => {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <h2>Hello DJ Mode</h2>
        </div>
        <div>
          {isPlaying ? (
            <MenuButton onClick={onStopBtnPress} backgroundColor="#f00">
              <FontAwesomeIcon icon={faStop} color="white" style={iconStyle} />
            </MenuButton>
          ) : (
            <MenuButton onClick={onPlayBtnPress} backgroundColor="#0f0">
              <FontAwesomeIcon icon={faPlay} color="white" style={iconStyle} />
            </MenuButton>
          )}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Loop
          data={loop1}
          toggleActiveNote={toggleActiveNote}
          highlightedNote={highlightedNote}
          lengthOfPage={LENGTH_OF_PAGE}
          toggleLoopActive={toggleLoopActive}
        />
        <Loop
          data={loop2}
          toggleActiveNote={toggleActiveNote2}
          highlightedNote={highlightedNote}
          lengthOfPage={LENGTH_OF_PAGE}
          toggleLoopActive={toggleLoopActive}
        />
        <Loop
          data={loop3}
          toggleActiveNote={toggleActiveNote3}
          highlightedNote={highlightedNote}
          lengthOfPage={LENGTH_OF_PAGE}
          toggleLoopActive={toggleLoopActive}
        />
        <Loop
          data={loop4}
          toggleActiveNote={toggleActiveNote4}
          highlightedNote={highlightedNote}
          lengthOfPage={LENGTH_OF_PAGE}
          toggleLoopActive={toggleLoopActive}
        />
      </div>
    </div>
  );
};
