import React, { useContext } from "react";
import { Row, Column, PageCircle } from "../../ui-kit";
import { globalContext } from "../../context/GlobalContext";

export const PageCircles = ({
  clickable = true,
  createMode,
}) => {

const { currentPage, setCurrentPage, pages } = useContext(globalContext);

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
                onClick={clickable ? () => setCurrentPage(i + 1) : null}
              />
            );
          })}
        </Row>
      </Column>
    </Row>
  );
};
