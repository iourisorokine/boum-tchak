import React from "react";
import { CreateLine } from "../CreateSong/elements/CreateLine";
import { MenuButton, Caption } from "../../ui-kit";
import { Switch } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

const LENGTH_OF_PAGE = 8;

const sectionStyle = {
  margin: 10,
  padding: 20,
  border: "solid #888 1px",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const iconStyle = { width: 16, height: 16 };

export const DJMode = ({
  loop1,
  loop2,
  loop3,
  isPlaying,
  onPlayBtnPress,
  onStopBtnPress,
  toggleLoop1Active,
  toggleLoop2Active,
  toggleLoop3Active,
  toggleActiveNote,
  toggleActiveNote2,
  toggleActiveNote3,
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
        <div style={sectionStyle}>
          {loop1.instruments.map((instrument, i) => {
            return (
              <CreateLine
                key={i}
                linePosition={i}
                label={instrument.label}
                notes={loop1.partition[i]}
                noteColors={instrument.colors}
                toggleActiveNote={toggleActiveNote}
                sounds={instrument.sounds}
                pitches={instrument.pitches}
                highlightedNote={highlightedNote}
                currentPage={1}
                lenghtOfPage={LENGTH_OF_PAGE}
              />
            );
          })}
          <div
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
            <Switch onChange={toggleLoop1Active} checked={loop1.status[0][0]} />
            <Caption>On</Caption>
          </div>
        </div>
        <div style={sectionStyle}>
          {loop2.instruments.map((instrument, i) => {
            return (
              <CreateLine
                key={i}
                linePosition={i}
                label={instrument.label}
                notes={loop2.partition[i]}
                noteColors={instrument.colors}
                toggleActiveNote={toggleActiveNote2}
                sounds={instrument.sounds}
                pitches={instrument.pitches}
                highlightedNote={highlightedNote}
                currentPage={1}
                lenghtOfPage={LENGTH_OF_PAGE}
              />
            );
          })}
          <div
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
            <Switch onChange={toggleLoop2Active} checked={loop2.status[0][0]} />
            <Caption>On</Caption>
          </div>
        </div>
        <div style={sectionStyle}>
          {loop3.instruments.map((instrument, i) => {
            return (
              <CreateLine
                key={i}
                linePosition={i}
                label={instrument.label}
                notes={loop3.partition[i]}
                noteColors={instrument.colors}
                toggleActiveNote={toggleActiveNote3}
                sounds={instrument.sounds}
                pitches={instrument.pitches}
                highlightedNote={highlightedNote}
                currentPage={1}
                lenghtOfPage={LENGTH_OF_PAGE}
              />
            );
          })}
          <div
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
            <Switch onChange={toggleLoop3Active} checked={loop3.status[0][0]} />
            <Caption>On</Caption>
          </div>
        </div>
      </div>
    </div>
  );
};
