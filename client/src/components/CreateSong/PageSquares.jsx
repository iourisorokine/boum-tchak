import React from "react";
import { Row, Column, PageSquare } from "../../ui-kit";

export const PageSquares = ({ currentPage, selectPage, pages }) => {
  return (
    <Row>
      <Column flex={2}></Column>
      <Column>
        <Row>
          {pages.map((el, i) => {
            return (
              <PageSquare
                selected={currentPage === i + 1}
                onClick={() => selectPage(i + 1)}
              />
            );
          })}
        </Row>
      </Column>
    </Row>
  );
};
