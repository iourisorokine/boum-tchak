import React from "react";
import { Note } from "./Note";
import { Line, LineLabel } from "../../ui-kit";

export const CreateLine = ({
  linePosition,
  notes,
  noteColors,
  toggleActiveNote,
  sounds,
  highlightedNote,
  label
}) => {
  const displayNotes = notes.map((n, i) => {
    return (
      <Note
        key={i}
        status={n}
        notePosition={i}
        colors={noteColors}
        toggleActiveNote={toggleActiveNote}
        linePosition={linePosition}
        sounds={sounds}
        highlighted={highlightedNote === i}
      />
    );
  });

  return (
    <Line>
      <LineLabel>{label && label}</LineLabel>
      {displayNotes}
    </Line>
  );
};
