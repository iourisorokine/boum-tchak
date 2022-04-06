import React, { FC } from "react";
import { StyledNote } from "../../../ui-kit";

export interface NoteProps {
  status: number;
  colors: string[];
  highlighted: boolean;
  isAnimated: boolean;
}

export const Note: FC<NoteProps> = ({ status, colors, highlighted, isAnimated }) => {
  const color = colors[status];

  return (
    <StyledNote
      color={color}
      highlighted={highlighted}
      animated={isAnimated}
    />
  );
};
