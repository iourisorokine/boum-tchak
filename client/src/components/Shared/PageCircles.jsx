import React from "react";
import { Row, Column, PageCircle } from "../../ui-kit";

export const PageCircles = ({
  currentPage,
  selectPage,
  pages,
  clickable = true,
  createMode,
}) => {
  if (pages.length < 2 && !createMode) {
    return null;
  }

  return (
    <Row>
      <Column flex={2}></Column>
      <Column>
        <Row>
          {pages.map((el, i) => {
            return (
              <PageCircle
                key={i}
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
