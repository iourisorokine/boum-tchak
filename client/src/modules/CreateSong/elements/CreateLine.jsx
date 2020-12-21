import React, { useContext } from "react";
import { globalContext } from "../../../context/GlobalContext";
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
  lenghtOfPage,
}) => {
  const { deleteLine } = useContext(globalContext);

  const firstIndex = (currentPage - 1) * lenghtOfPage;
  const lastIndex = currentPage * lenghtOfPage;

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
              animated={animatedNotes.includes(i)}
            />
          );
        }
        return null;
      })
    : [];

  return (
    <Line>
      <DeleteButton onClick={() => deleteLine(linePosition)}>x</DeleteButton>
      <LineLabel width={'100px'}>
        {label && label}
      </LineLabel>
      {displayNotes}
    </Line>
  );
};
