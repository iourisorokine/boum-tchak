import React from "react";
import { StyledNote } from "../../ui-kit";

export const Note = ({
  notePosition,
  status,
  colors,
  toggleActiveNote,
  linePosition,
  sounds,
  highlighted,
}) => {

  const onNoteClick = () => {
    toggleActiveNote(notePosition, linePosition, sounds);
  };

  const color = colors[status];

  return <StyledNote color={color} highlighted={highlighted} onClick={onNoteClick}/>;
};
