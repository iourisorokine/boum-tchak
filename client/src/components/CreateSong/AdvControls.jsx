import React from "react";
import { Button, ControlsPad } from "../../ui-kit/styles";

export const AdvControls = ({
  toggleIsAddInstrumentVisible,
  toggleIsSaveSongVisible,
}) => {
  return (
    <ControlsPad>
      <Button onClick={toggleIsSaveSongVisible}>Save Song</Button>
      <Button onClick={() => {}}>Load Song</Button>
      <Button onClick={toggleIsAddInstrumentVisible}>Add Line</Button>
      <Button onClick={() => {}}>Remove Line</Button>
    </ControlsPad>
  );
};
