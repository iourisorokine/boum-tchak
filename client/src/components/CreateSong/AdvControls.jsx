import React from "react";
import { Button, ControlsPad } from "../../ui-kit/styles";

export const AdvControls = ({ saveSong }) => {

  return (
    <ControlsPad>
      <Button onClick={saveSong}>Save Song</Button>
      <Button onClick={() => {}}>Load Song</Button>
      <Button onClick={() => {}}>Add Line</Button>
      <Button onClick={() => {}}>Remove Line</Button>
    </ControlsPad>
  );
};
