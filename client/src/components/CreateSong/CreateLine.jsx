import React, { useContext } from "react";
import { globalContext } from "../../context/GlobalContext";
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
  animatedNotes,
  deleteLine,
  currentPage,
  lenghtOfPage,
}) => {
  const { isRemoveInstrumentVisible } = useContext(globalContext);

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
              colors={noteColors}
              toggleActiveNote={toggleActiveNote}
              linePosition={linePosition}
              sounds={sounds}
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
      <LineLabel>{label && label}</LineLabel>
      {isRemoveInstrumentVisible && (
        <DeleteButton onClick={() => deleteLine(linePosition)}>x</DeleteButton>
      )}
      {displayNotes}
    </Line>
  );
};
