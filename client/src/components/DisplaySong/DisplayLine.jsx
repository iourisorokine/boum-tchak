import React from "react";
import { Note } from "./Note";
import { Line } from "../../ui-kit";

export const DisplayLine = ({
  notes,
  noteColors,
  highlightedNote,
  animatedNotes,
}) => {
  const displayNotes = notes.map((n, i) => {
    return (
      <Note
        key={i}
        status={n}
        colors={noteColors}
        highlighted={highlightedNote === i}
        isAnimated={animatedNotes.includes(i)}
      />
    );
  });

  return <Line>{displayNotes}</Line>;
};
