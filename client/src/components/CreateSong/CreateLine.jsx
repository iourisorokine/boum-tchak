import React from "react";
import { Note } from "./Note";
import { Line, LineLabel, DeleteButton } from "../../ui-kit";

export const CreateLine = ({
  linePosition,
  notes,
  noteColors,
  toggleActiveNote,
  sounds,
  highlightedNote,
  label,
  isDeleteLineVisible,
  deleteLine,
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
      {isDeleteLineVisible && (
        <DeleteButton onClick={() => deleteLine(linePosition)}>x</DeleteButton>
      )}
      {displayNotes}
    </Line>
  );
};
