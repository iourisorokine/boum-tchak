import React, { useContext } from "react";
import {
  Button,
  PlayButton,
  StopButton,
  ControlsPad,
  Tempo,
} from "../../ui-kit";
import { globalContext } from "../../context/GlobalContext";

export const PlayControls = ({
  onPlayBtnPress,
  onStopBtnPress,
  addOneBar,
  removeOneBar,
  numberOfBars,
}) => {
  const {
    tempo,
    setTempo,
    isPlaying,
    setTimeoutTempo,
    isNotePlayedOnClick,
    setIsNotePlayedOnClick,
  } = useContext(globalContext);

  const togglePlayOnClick = () => {
    setIsNotePlayedOnClick(!isNotePlayedOnClick);
  };

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
