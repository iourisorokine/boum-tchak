import React, { useContext } from "react";
import { globalContext } from "../../context/GlobalContext";
import { Button, ControlsPad } from "../../ui-kit";
import { Link } from "react-router-dom";

export const AdvControls = ({ toggleIsSaveSongVisible, user }) => {
  const {
    toggleIsRemoveInstrumentVisible,
    toggleIsAddInstrumentVisible,
  } = useContext(globalContext);

  return (
    <ControlsPad>
      <Button onClick={toggleIsSaveSongVisible}>Save Song</Button>
      {user && (
        <Link to="/load-song">
          <Button>Load Song</Button>
        </Link>
      )}
      <Button onClick={toggleIsAddInstrumentVisible}>Add Instrument</Button>
      <Button onClick={toggleIsRemoveInstrumentVisible}>
        Remove Instrument
      </Button>
    </ControlsPad>
  );
};
