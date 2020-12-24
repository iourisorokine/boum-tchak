import React from "react";
import { CreateLine } from "../../CreateSong/elements/CreateLine";
import { Caption } from "../../../ui-kit";
import { Switch } from "@material-ui/core";

const loopStyle = {
  margin: 10,
  padding: 20,
  border: "solid #888 1px",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export const Loop = ({
  data,
  toggleActiveNote,
  highlightedNote,
  lengthOfPage,
  toggleLoopActive,
}) => {
  const onToggleActivePress = () => {
    toggleLoopActive(data);
  };
  return (
    <div style={loopStyle}>
      <div>
        {data.instruments.map((instrument, i) => {
          return (
            <CreateLine
              key={i}
              linePosition={i}
              label={instrument.label}
              notes={data.partition[i]}
              noteColors={instrument.colors}
              toggleActiveNote={toggleActiveNote}
              sounds={instrument.sounds}
              pitches={instrument.pitches}
              highlightedNote={highlightedNote}
              currentPage={1}
              lenghtOfPage={lengthOfPage}
              hasDeleteButton={false}
            />
          );
        })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <Switch onChange={onToggleActivePress} checked={data.status[0][0]} />
        <Caption>On</Caption>
      </div>
    </div>
  );
};
