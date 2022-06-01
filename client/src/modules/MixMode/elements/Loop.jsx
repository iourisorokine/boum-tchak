import React, { useContext } from "react";
import { CreateLine } from "../../CreateSong/elements/CreateLine";
import { Caption, Section, AverageEditBtn, SmallTitle } from "../../../ui-kit";
import { getRandomLoop } from "../utils/randomLoops";
import { getRandomSequence } from "../utils/loopsGenerator";
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

  const setRandomLoop2 = (loop) => {
    const updatedPartition = [...loop.partition];
    const length = loop.partition[0].length;
    updatedPartition.forEach((line, lineIndex) => {
      const depth = loop.instruments[lineIndex].sounds.length - 1;
      const randomSequence = getRandomSequence(depth, length, 2);
      line.forEach((note, noteIndex) => {
        line[noteIndex] = randomSequence[noteIndex];
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
    setRandomLoop2(data);
  };
  return (
    <Section>
      <div style={{ display: "flex" }}>
        <div>
          <SmallTitle b style={{ margin: "-4px 0 8px -10px" }}>
            {data.name}
          </SmallTitle>
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
            paddingTop: 12,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              onChange={onToggleActivePress}
              checked={!!data.status[0][0]}
            />
            <Caption>On</Caption>
          </div>
          <div style={{ padding: "0 0 0 12px" }}>
            <AverageEditBtn onClick={onResetClick}>Reset</AverageEditBtn>
          </div>
          <div style={{ padding: "0 0 0 12px" }}>
            <AverageEditBtn onClick={onRandomBtnClick}>Random</AverageEditBtn>
          </div>
        </div>
      </div>
    </Section>
  );
};
