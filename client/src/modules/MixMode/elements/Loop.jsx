import React, { useContext } from "react";
import { CreateLine } from "../../CreateSong/elements/CreateLine";
import { Caption, Section, AverageEditBtn } from "../../../ui-kit";
import { getRandomLoop } from "../utils/randomLoops";
import { Switch } from "@material-ui/core";
import { djContext } from "../context/DjContext";

export const Loop = ({
  data,
  toggleActiveNote,
  highlightedNote,
  toggleLoopActive,
}) => {
  const { setPartition } = useContext(djContext);

  const resetPartition = (loop) => {
    const updatedPartition = [...loop.partition];
    updatedPartition.forEach((line) => {
      line.forEach((note, index) => {
        line[index] = 0;
      });
    });
    setPartition(updatedPartition, loop.name);
  };

  const setRandomLoop = (loop) => {
    const randomLoop = getRandomLoop(loop.name, loop.partition[0].length);
    const updatedPartition = [...loop.partition];
    updatedPartition.forEach((line, lineIndex) => {
      line.forEach((note, noteIndex) => {
        line[noteIndex] = randomLoop[lineIndex][noteIndex];
      });
    });
    setPartition(updatedPartition, loop.name);
  };

  const onToggleActivePress = () => {
    toggleLoopActive(data);
  };
  const toggleActiveNoteForLoop = (col, row, sounds, pitches) => {
    return toggleActiveNote(col, row, sounds, pitches, data);
  };
  const onResetClick = () => {
    resetPartition(data);
  };
  const onRandomBtnClick = () => {
    setRandomLoop(data);
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
              lengthOfPage={32}
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
        <Switch onChange={onToggleActivePress} checked={!!data.status[0][0]} />
        <Caption>On</Caption>
        <div style={{ padding: "0 0 0 16px" }}>
          <AverageEditBtn onClick={onResetClick}>Reset</AverageEditBtn>
        </div>
        <div style={{ padding: "0 0 0 16px" }}>
          <AverageEditBtn onClick={onRandomBtnClick}>Random</AverageEditBtn>
        </div>
      </div>
    </Section>
  );
};