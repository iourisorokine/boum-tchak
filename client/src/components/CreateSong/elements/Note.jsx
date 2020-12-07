import React from "react";
import { StyledNote } from "../../../ui-kit";

export const Note = ({
  notePosition,
  color,
  status,
  toggleActiveNote,
  linePosition,
  sounds,
  highlighted,
  animated,
  pitches,
}) => {
  const onNoteClick = () => {
    toggleActiveNote(notePosition, linePosition, sounds, pitches);
  };

  const pitch = pitches[status];

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
