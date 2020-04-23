import React from "react";
import {
  Button,
  PlayButton,
  StopButton,
  ControlsPad,
  Tempo,
} from "../../ui-kit";

export const PlayControls = ({
  onPlayBtnPress,
  onStopBtnPress,
  isPlaying,
  addOneBar,
  removeOneBar,
  isNotePlayedOnClick,
  setIsNotePlayedOnClick,
  tempo,
  setTempo,
  setTimeoutTempo,
  numberOfBars,
}) => {
  const togglePlayOnClick = () => {
    setIsNotePlayedOnClick(!isNotePlayedOnClick);
  };

  const onPlusTempoPress = () => {
    setTempo(tempo + 5);
    const calcTimeout = 60000 / tempo / 4;
    setTimeoutTempo(calcTimeout);
  };

  const onMinusTempoPress = () => {
    setTempo(tempo - 5);
    const calcTimeout = 60000 / tempo / 4;
    setTimeoutTempo(calcTimeout);
  };

  return (
    <ControlsPad>
      {isPlaying ? (
        <StopButton onClick={onStopBtnPress}>[]</StopButton>
      ) : (
        <PlayButton onClick={onPlayBtnPress}>></PlayButton>
      )}
      <Button onClick={togglePlayOnClick}>
        Play on click: {isNotePlayedOnClick ? "yes" : "no"}
      </Button>
      <Button onClick={removeOneBar}>-</Button>
      <Tempo>Bars: {numberOfBars}</Tempo>
      <Button onClick={addOneBar}>+</Button>
      <Button onClick={onMinusTempoPress}>-</Button>
      <Tempo>Tempo: {tempo}</Tempo>
      <Button onClick={onPlusTempoPress}>+</Button>
    </ControlsPad>
  );
};
