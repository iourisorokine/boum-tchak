import React from "react";
import { Row, Button } from "../../ui-kit";

export const AddSound = ({ switchToOverview }) => {
  return (
    <React.Fragment>
      <Row>
        <Button backgroundColor="#0f0" onClick={() => {}}>
          Add
        </Button>
        <Button backgroundColor="#f00" onClick={switchToOverview}>
          Cancel
        </Button>
      </Row>
    </React.Fragment>
  );
};
