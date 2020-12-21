import React, { useContext } from "react";
import { Row, Column, PageCircle, Caption, AverageEditBtn } from "../../../ui-kit";
import { Switch } from '@material-ui/core';
import { globalContext } from "../../../context/GlobalContext";

export const TopMenu = ({
  clickable = true,
}) => {

const { 
  currentPage, 
  setCurrentPage, 
  pages, 
  isNotePlayedOnClick, 
  setIsNotePlayedOnClick, 
  tempo,
  setTempo,
  setTimeoutTempo,
} = useContext(globalContext);

const onPlusTempoPress = () => {
  setTempo(tempo + 5);
  const newTimeout = 60000 / tempo / 4;
  setTimeoutTempo(newTimeout);
};

const onMinusTempoPress = () => {
  setTempo(tempo - 5);
  const newTimeout = 60000 / tempo / 4;
  setTimeoutTempo(newTimeout);
};

  const togglePlayOnClick = () => {
    setIsNotePlayedOnClick(!isNotePlayedOnClick);
  };

  return (
    <Row padding="0 0 24px 0">
      <Column flexDirection="row" alignItems="center" justifyContent="flex-end">
        <Caption>
          Play on click
        </Caption>
        <Switch onChange={togglePlayOnClick} checked={isNotePlayedOnClick}/>
      </Column>
      <Column flexDirection="row" alignItems="center" justifyContent="center">
        <AverageEditBtn onClick={onMinusTempoPress}>-</AverageEditBtn>
        <Caption>tempo: {tempo}</Caption>
        <AverageEditBtn onClick={onPlusTempoPress}>+</AverageEditBtn>
      </Column>
      <Column flexDirection="row" alignItems="center" justifyContent="left">
          <Caption>
            Pages:
          </Caption>
          {pages.map((el, i) => {
            return (
              <PageCircle
                key={i}
                selected={currentPage === i + 1}
                onClick={clickable ? () => setCurrentPage(i + 1) : null}
              />
            );
          })}
      </Column>
    </Row>
  );
};
