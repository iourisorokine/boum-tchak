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
import { playBeat } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

const iconStyle = { width: 16, height: 16 };

export const PlayControls = ({
  onStopBtnPress,
  addOneBar,
  removeOneBar,
  user,
}) => {

  const {
    tempo,
    setTempo,
    isPlaying,
    setIsPlaying,
    musicPlaying,
    partition,
    instruments,
    timeoutTempo,
    setTimeoutTempo,
    isNotePlayedOnClick,
    isSaveSongVisible,
    setIsSaveSongVisible,
    setIsNotePlayedOnClick,
    setCurrentPage,
    setHighlightedNote,
    setAnimatedNotes,
  } = useContext(globalContext);

  const lengthOfPage = window.innerWidth >= 800 ? 16 : 12;

  const playMusic = (instruments, partition, tempo) => {
    if (!partition || !partition.length) return;
    setIsPlaying(true);
    setCurrentPage(1);
    let counter = 0;

    const playInterval = () => {
      setHighlightedNote(counter);
      setAnimatedNotes([counter - 1, counter, counter + 1]);
      playBeat(instruments, partition, counter);
      counter++;
      if (counter >= partition[0].length) {
        counter = 0;
      }
      if (counter % lengthOfPage === 1) {
        const nextPage = Math.ceil(counter / lengthOfPage);
        setCurrentPage(nextPage);
      }
    };
    musicPlaying.current = setInterval(playInterval, tempo);
  };

  const onPlayBtnPress = () => {
    playMusic(instruments, partition, timeoutTempo);
  };

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
      <Button onClick={() => setIsSaveSongVisible(!isSaveSongVisible)}>Save</Button>
      {user && (
        <Link to="/load-song">
          <Button>Load</Button>
        </Link>
      )}
    </ControlsPad>
  );
};
