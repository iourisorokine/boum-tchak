import React from "react";
import { Note } from "./Note";
import { Line } from "../../ui-kit";

export const DisplayLine = ({
  notes,
  noteColors,
  highlightedNote,
  animatedNotes,
  lengthOfPage,
  currentPage,
}) => {
  const firstIndex = (currentPage - 1) * lengthOfPage;
  const lastIndex = currentPage * lengthOfPage;

  const displayNotes = notes.map((n, i) => {
    if (i >= firstIndex && i < lastIndex) {
      return (
        <Note
          key={i}
          status={n}
          colors={noteColors}
          highlighted={highlightedNote === i}
          isAnimated={animatedNotes.includes(i)}
        />
      );
    }
  });

  return <Line>{displayNotes}</Line>;
};
