import React from "react";
import { Line, LineLabel } from "../../ui-kit";

export const ToolsLine = ({ notes }) => {
  const displayBarsLength = [];
  const oneBar = (
    <div
      style={{
        borderBottom: "1px solid #888",
        width: 138,
        marginRight: 3,
        marginLeft: 3,
        marginBottom: 12,
        fontSize: 10,
        color: "#888",
      }}>
      1 bar
    </div>
  );

  if (notes?.length && notes?.length >= 4) {
    for (let i = 4; i <= notes.length; i += 4) {
      displayBarsLength.push(oneBar);
    }
  }
  return (
    <Line>
      <LineLabel />
      {displayBarsLength}
    </Line>
  );
};
