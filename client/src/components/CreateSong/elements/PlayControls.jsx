import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { globalContext } from "../../../context/GlobalContext";
import {
  MenuButton,
  Row,
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
    isSaveSongVisible,
    setIsSaveSongVisible,
  } = useContext(globalContext);

  return (
    <Row justifyContent="center">
      {isPlaying ? (
        <MenuButton onClick={onStopBtnPress} backgroundColor="#f00">
          <FontAwesomeIcon icon={faStop} color="white" style={iconStyle} />
        </MenuButton>
      ) : (
        <MenuButton onClick={onPlayBtnPress} backgroundColor="#0f0">
          <FontAwesomeIcon icon={faPlay} color="white" style={iconStyle} />
        </MenuButton>
      )}
      <MenuButton onClick={() => setIsSaveSongVisible(!isSaveSongVisible)}>Save</MenuButton>
      {user && (
        <Link to="/load-song">
          <MenuButton>Load</MenuButton>
        </Link>
      )}
    </Row>
  );
};
