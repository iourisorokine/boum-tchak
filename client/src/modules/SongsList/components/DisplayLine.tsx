import React, { FC } from "react";

import { Line } from "../../../ui-kit";
import { Note } from ".";

export interface DisplayLineProps {
  notes: number[],
  noteColors: string[],
  highlightedNote: number,
  animatedNotes: number[],
  lengthOfPage: number,
  currentPage: number,
}

export const DisplayLine: FC<DisplayLineProps> = ({
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
