import React from "react";

export const Note = ({
  status,
  colors,
  highlighted
}) => {
  const noteStyle = {
    height: 30,
    width: 30,
    margin: 1,
    backgroundColor: colors[status],
    opacity: highlighted ? 0.7 : 1
  };

  return <div style={noteStyle}></div>;
};
