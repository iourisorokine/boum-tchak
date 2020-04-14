import React from "react";
import { StyledNote } from "../../ui-kit";

export const Note = ({ status, colors, highlighted }) => {
  const color = colors[status];

  return <StyledNote color={color} highlighted={highlighted} />;
};
