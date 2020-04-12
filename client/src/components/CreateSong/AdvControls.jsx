import React from "react";
import { Button, ControlsPad } from "../../ui-kit/styles";
import { Link } from "react-router-dom";

export const AdvControls = ({
  toggleIsAddInstrumentVisible,
  toggleIsSaveSongVisible,
}) => {
  return (
    <ControlsPad>
      <Button onClick={toggleIsSaveSongVisible}>Save Song</Button>
      <Link to="/load-song">
        <Button onClick={() => {}}>Load Song</Button>
      </Link>
      <Button onClick={toggleIsAddInstrumentVisible}>Add Line</Button>
      <Button onClick={() => {}}>Remove Line</Button>
    </ControlsPad>
  );
};
