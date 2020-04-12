import React from "react";

export const Note = ({
  notePosition,
  status,
  colors,
  toggleActiveNote,
  linePosition,
  sounds,
  highlighted,
}) => {
  const dynamicNoteStyle = {
    height: 30,
    width: 30,
    margin: 1,
    backgroundColor: colors[status],
    opacity: highlighted ? 0.5 : 1,
  };

  const onNoteClick = () => {
    toggleActiveNote(notePosition, linePosition, sounds);
  };

  return <div style={dynamicNoteStyle} onClick={onNoteClick}></div>;
};
