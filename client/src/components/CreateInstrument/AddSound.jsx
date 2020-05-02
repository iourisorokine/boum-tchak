import React, { useState } from "react";
import { AvailableSoundsList } from "./AvailableSoundsList";
import { SketchPicker } from "react-color";
import { CreateSound } from "./CreateSound";
import { Row, Button, Column, ColorSquare } from "../../ui-kit";

const views = {
  ADD: "ADD",
  UPLOAD: "UPLOAD",
};

export const AddSound = ({
  switchToOverview,
  availableSounds,
  selectedSound,
  selectSound,
  addSound,
  loading,
}) => {
  const [soundColor, setSoundColor] = useState("#aaa");
  const [view, setView] = useState(views.ADD);
  const handleColorChange = (color) => {
    setSoundColor(color.hex);
  };

  return (
    <React.Fragment>
      <Row>
        <Column>
          <h3>Add Sound:</h3>
        </Column>
        <Column flexDirection="row" justifyContent="flex-end">
          {view === views.ADD && (
            <Button
              onClick={() => {
                setView(views.UPLOAD);
              }}>
              Upload own sound
            </Button>
          )}
          {view === views.UPLOAD && (
            <Button
              onClick={() => {
                setView(views.ADD);
              }}>
              Search sound
            </Button>
          )}

          <Button
            backgroundColor="#0f0"
            onClick={() => addSound(selectedSound, soundColor)}>
            Add
          </Button>
          <Button backgroundColor="#f00" onClick={switchToOverview}>
            Cancel
          </Button>
        </Column>
      </Row>
      <Row>
        <Column flex={2} justifyContent="flex-start">
          <Row>
            <Column
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start">
              <p>Color:</p>
              <ColorSquare backgroundColor={soundColor} />
            </Column>
          </Row>
          <SketchPicker
            color={soundColor}
            onChangeComplete={handleColorChange}
          />
        </Column>
        <Column flex={3}>
          {view === views.UPLOAD && <CreateSound />}
          {view === views.ADD && (
            <AvailableSoundsList
              loading={loading}
              availableSounds={availableSounds}
              selectedSound={selectedSound}
              selectSound={selectSound}
            />
          )}
        </Column>
      </Row>
    </React.Fragment>
  );
};