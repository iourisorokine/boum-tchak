import React, { useContext } from "react";
import { LineLabel, Row, SmallEditBtn, BarIndicator } from "../../ui-kit";
import { globalContext } from "../../context/GlobalContext";

export const ToolsLine = ({
  totalLength,
  lengthOfPage,
  isLastPage,
  currentPage,
}) => {
  const { copyOneBar, copiedPartitionBar, pasteOneBar } = useContext(
    globalContext
  );

  const barsPerPage = lengthOfPage / 4;
  const displayBarsLength = [];
  const l = totalLength;
  const lastPageFull = l && l % lengthOfPage === 0;
  const maxLength = l > lengthOfPage ? lengthOfPage : l;
  const maxLength2 = isLastPage && !lastPageFull ? l % lengthOfPage : maxLength;

  if (lengthOfPage && lengthOfPage >= 4) {
    for (let i = 4; i <= maxLength2; i += 4) {
      // Zero base index
      const barIndex = (currentPage - 1) * barsPerPage + i / 4 - 1;
      displayBarsLength.push(
        <BarIndicator key={barIndex}>
          1 bar
          <SmallEditBtn onClick={() => copyOneBar(barIndex)}>copy</SmallEditBtn>
          {copiedPartitionBar && (
            <SmallEditBtn onClick={() => pasteOneBar(barIndex)}>
              paste
            </SmallEditBtn>
          )}
        </BarIndicator>
      );
    }
  }
  return (
    <Row>
      <LineLabel />
      {displayBarsLength}
    </Row>
  );
};
