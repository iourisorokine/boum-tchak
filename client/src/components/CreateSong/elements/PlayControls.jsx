import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { globalContext } from "../../../context/GlobalContext";
import {
  Button,
  PlayButton,
  StopButton,
  ControlsPad,
  TextSpan,
} from "../../../ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

const iconStyle = { width: 16, height: 16 };

export const PlayControls = ({
  onPlayBtnPress,
  onStopBtnPress,
  addOneBar,
  removeOneBar,
  user,
  toggleIsSaveSongVisible,
}) => {
  const {
    tempo,
    setTempo,
    isPlaying,
    partition,
    setTimeoutTempo,
    isNotePlayedOnClick,
    setIsNotePlayedOnClick,
  } = useContext(globalContext);

  const numberOfBars = partition[0] ? partition[0].length : 0;

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
      <TextSpan>Notes: {numberOfBars}</TextSpan>
      <Button onClick={addOneBar}>+</Button>
      <Button onClick={onMinusTempoPress}>-</Button>
      <TextSpan>Tempo: {tempo}</TextSpan>
      <Button onClick={onPlusTempoPress}>+</Button>
      <Button onClick={toggleIsSaveSongVisible}>Save</Button>
      {user && (
        <Link to="/load-song">
          <Button>Load</Button>
        </Link>
      )}
    </ControlsPad>
  );
};
