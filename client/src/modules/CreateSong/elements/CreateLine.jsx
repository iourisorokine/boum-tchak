import React, { useContext } from "react";
import { globalContext } from "../context/GlobalContext";
import { Note } from "./Note";
import { Line, LineLabel, DeleteButton } from "../../../ui-kit";

export const CreateLine = ({
  linePosition,
  notes,
  noteColors,
  toggleActiveNote,
  sounds,
  pitches,
  highlightedNote,
  label,
  animatedNotes,
  currentPage,
  lengthOfPage,
  hasDeleteButton = true,
  smallNotes = false,
}) => {
  const { deleteLine } = useContext(globalContext);

  const firstIndex = (currentPage - 1) * lengthOfPage;
  const lastIndex = currentPage * lengthOfPage;

  const displayNotes = notes?.length
    ? notes.map((n, i) => {
        if (i >= firstIndex && i < lastIndex) {
          return (
            <Note
              key={i}
              status={n}
              notePosition={i}
              color={noteColors[n]}
              toggleActiveNote={toggleActiveNote}
              linePosition={linePosition}
              sounds={sounds}
              pitches={pitches}
              highlighted={highlightedNote === i}
              animated={animatedNotes?.includes(i)}
            />
          );
        }
        return null;
      })
    : [];

  return (
    <Line>
      {hasDeleteButton && (
        <DeleteButton onClick={() => deleteLine(linePosition)}>x</DeleteButton>
      )}
      <LineLabel width={"110px"}>{label && label}</LineLabel>
      {displayNotes}
    </Line>
  );
};
