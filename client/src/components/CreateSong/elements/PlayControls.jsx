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
  onStopBtnPress,
  onPlayBtnPress,
  user,
}) => {

  const {
    isPlaying,
    partition,
    isSaveSongVisible,
    setIsSaveSongVisible,
  } = useContext(globalContext);

  const numberOfBars = partition[0] ? partition[0].length : 0;

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
      <Button onClick={() => setIsSaveSongVisible(!isSaveSongVisible)}>Save</Button>
      {user && (
        <Link to="/load-song">
          <Button>Load</Button>
        </Link>
      )}
    </ControlsPad>
  );
};
