import React from "react";
import { Button, ControlsPad } from "../../ui-kit";
import { Link } from "react-router-dom";

export const AdvControls = ({
  toggleIsAddInstrumentVisible,
  toggleIsSaveSongVisible,
  toggleIsDeleteLineVisible,
  user,
}) => {
  return (
    <ControlsPad>
      <Button onClick={toggleIsSaveSongVisible}>Save Song</Button>
      {user && (
        <Link to="/load-song">
          <Button>Load Song</Button>
        </Link>
      )}
      <Button onClick={toggleIsAddInstrumentVisible}>Add Instrument</Button>
      <Button onClick={toggleIsDeleteLineVisible}>Remove Instrument</Button>
    </ControlsPad>
  );
};
