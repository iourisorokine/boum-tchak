import React from "react";
import { CreateLine } from "../../CreateSong/elements/CreateLine";
import { Caption, Section, AverageEditBtn } from "../../../ui-kit";
import { Switch } from "@material-ui/core";

export const Loop = ({
  data,
  toggleActiveNote,
  highlightedNote,
  lengthOfPage,
  toggleLoopActive,
  resetPartition,
}) => {
  const onToggleActivePress = () => {
    toggleLoopActive(data);
  };
  const toggleActiveNoteForLoop = (col, row, sounds, pitches) => {
    return toggleActiveNote(col, row, sounds, pitches, data);
  };
  const onResetClick = () => {
    resetPartition(data);
  };
  return (
    <Section flexDirection="column">
      <div>
        {data.instruments.map((instrument, i) => {
          return (
            <CreateLine
              key={i}
              linePosition={i}
              label={instrument.label}
              notes={data.partition[i]}
              noteColors={instrument.colors}
              toggleActiveNote={toggleActiveNoteForLoop}
              sounds={instrument.sounds}
              pitches={instrument.pitches}
              highlightedNote={highlightedNote % data?.partition[i]?.length}
              currentPage={1}
              lenghtOfPage={lengthOfPage}
              hasDeleteButton={false}
            />
          );
        })}
      </div>
      <div
        style={{
          paddingTop: 16,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
        <Switch onChange={onToggleActivePress} checked={data.status[0][0]} />
        <Caption>On</Caption>
        <div style={{ padding: "0 0 0 16px" }}>
          <AverageEditBtn onClick={onResetClick}>Reset</AverageEditBtn>
        </div>
        <div style={{ padding: "0 0 0 16px" }}>
          <AverageEditBtn>Random</AverageEditBtn>
        </div>
      </div>
    </Section>
  );
};
