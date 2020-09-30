import React from "react";
import { Line, LineLabel } from "../../ui-kit";

export const ToolsLine = ({ notes, lengthOfPage, isLastPage }) => {
  const displayBarsLength = [];
  const lastPageFull = notes?.length && notes?.length % lengthOfPage === 0;
  const maxLength = notes?.length > lengthOfPage ? lengthOfPage : notes?.length;
  const maxLength2 =
    isLastPage && lastPageFull
      ? maxLength
      : isLastPage
      ? notes?.length % lengthOfPage
      : maxLength;

  if (lengthOfPage && lengthOfPage >= 4) {
    for (let i = 4; i <= maxLength2; i += 4) {
      displayBarsLength.push(
        <div
          key={i}
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
    }
  }
  return (
    <Line>
      <LineLabel />
      {displayBarsLength}
    </Line>
  );
};
