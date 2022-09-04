import React, { useContext } from "react";
import { globalContext } from "../context/GlobalContext";
import { Note } from "./Note";
import { Line, LineLabel, DeleteButton } from "../../../ui-kit";

export interface CreateLineProps {
  linePosition: number;
  notes: any[];
  noteColors: string[];
  toggleActiveNote: any;
  sounds: any[];
  pitches: string[];
  highlightedNote: number;
  label: string;
  currentPage: number;
  lengthOfPage: number;
  animatedNotes?: number[];
  hasDeleteButton?: boolean;
  smallNotes?: boolean;
}

export const CreateLine: React.FC<CreateLineProps> = ({
  linePosition,
  notes,
  noteColors,
  toggleActiveNote,
  sounds,
  pitches,
  highlightedNote,
  label,
  currentPage,
  lengthOfPage,
  animatedNotes = [],
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
