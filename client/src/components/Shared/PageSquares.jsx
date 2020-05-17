import React from "react";
import { Row, Column, PageSquare } from "../../ui-kit";

export const PageSquares = ({
  currentPage,
  selectPage,
  pages,
  clickable = true,
}) => {
  if (pages.length < 2) {
    return null;
  }

  return (
    <Row>
      <Column flex={2}></Column>
      <Column>
        <Row>
          {pages.map((el, i) => {
            return (
              <PageSquare
                selected={currentPage === i + 1}
                onClick={clickable ? () => selectPage(i + 1) : null}
              />
            );
          })}
        </Row>
      </Column>
    </Row>
  );
};
