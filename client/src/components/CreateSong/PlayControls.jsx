import React, { useContext } from "react";
import { globalContext } from "../../context/GlobalContext";
import {
  Button,
  PlayButton,
  StopButton,
  ControlsPad,
  Tempo,
} from "../../ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

const iconStyle = { width: 16, height: 16 };

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
        <StopButton onClick={onStopBtnPress}>
          <FontAwesomeIcon icon={faStop} color="white" style={iconStyle} />
        </StopButton>
      ) : (
        <PlayButton onClick={onPlayBtnPress}>
          <FontAwesomeIcon icon={faPlay} color="white" style={iconStyle} />
        </PlayButton>
      )}
      <Button onClick={togglePlayOnClick}>
        Play on click: {isNotePlayedOnClick ? "yes" : "no"}
      </Button>
      <Button onClick={removeOneBar}>-</Button>
      <Tempo>Notes: {numberOfBars}</Tempo>
      <Button onClick={addOneBar}>+</Button>
      <Button onClick={onMinusTempoPress}>-</Button>
      <Tempo>Tempo: {tempo}</Tempo>
      <Button onClick={onPlusTempoPress}>+</Button>
    </ControlsPad>
  );
};
