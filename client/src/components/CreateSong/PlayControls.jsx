import React from "react";
import { Button, ControlsPad, Tempo } from "../../ui-kit/styles";

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
  setTimeoutTempo
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
        <Button onClick={onStopBtnPress}>stop</Button>
      ) : (
        <Button onClick={onPlayBtnPress}>play</Button>
      )}
      <Button onClick={addOneBar}>+1 bar</Button>
      <Button onClick={removeOneBar}>-1 bar</Button>
      <Button onClick={togglePlayOnClick}>
        Play on click: {isNotePlayedOnClick ? "yes" : "no"}
      </Button>

      <Button onClick={onMinusTempoPress}>-</Button>
      <Tempo>Tempo: {tempo}</Tempo>
      <Button onClick={onPlusTempoPress}>+</Button>
    </ControlsPad>
  );
};
