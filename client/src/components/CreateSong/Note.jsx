import React from "react";
import { StyledNote } from "../../ui-kit";

export const Note = ({
  notePosition,
  status,
  color,
  toggleActiveNote,
  linePosition,
  sounds,
  highlighted,
  animated,
  pitch,
}) => {
  const onNoteClick = () => {
    toggleActiveNote(notePosition, linePosition, sounds);
  };

  return (
    <StyledNote
      color={color}
      highlighted={highlighted}
      onClick={onNoteClick}
      clickable={true}
      animated={animated}
    >
    { pitch ? pitch : '' }
    </StyledNote>
  );
};
