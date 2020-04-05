import React from "react";
import { Note } from "./Note";
import { Line } from "../../ui-kit";

export const DisplayLine = ({ notes, noteColors, highlightedNote }) => {
  const displayNotes = notes.map((n, i) => {
    return (
      <Note
        key={i}
        status={n}
        colors={noteColors}
        highlighted={highlightedNote === i}
      />
    );
  });

  return <Line>{displayNotes}</Line>;
};
