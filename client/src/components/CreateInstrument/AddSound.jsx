import React, { useState, useEffect } from "react";
import { AvailableSoundsList } from "./AvailableSoundsList";
import { CreateSound } from "./CreateSound";
import { Row, Button, Column, Heading2, Input } from "../../ui-kit";

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
  fetchData,
  displayMessage,
}) => {
  const [view, setView] = useState(views.ADD);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    selectSound(null);
  }, []);

  const handleAddSoundClick = () => {
    if (!selectedSound || !selectedSound.name || !selectedSound.url) {
      displayMessage("Please select a sound first");
      return;
    }
    addSound({
      name: selectedSound.name,
      color: "#ddd",
      url: selectedSound.url,
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Column flexDirection="row" justifyContent="left">
          <Heading2>Add Sound</Heading2>
        </Column>
        <Column flexDirection="row" justifyContent="left">
          <Input
            type="text"
            width="140px"
            value={filterName}
            placeholder="Search..."
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Column>
        <Column flex={2} flexDirection="row" justifyContent="flex-end">
          <Button backgroundColor="#0f0" onClick={handleAddSoundClick}>
            Add
          </Button>
          <Button backgroundColor="#f00" onClick={switchToOverview}>
            Cancel
          </Button>
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
        </Column>
      </Row>
      <Row>
        <Column flex={1}>
          {view === views.UPLOAD && (
            <CreateSound setView={setView} fetchData={fetchData} />
          )}
          {view === views.ADD && (
            <AvailableSoundsList
              loading={loading}
              availableSounds={availableSounds}
              selectedSound={selectedSound}
              selectSound={selectSound}
              filterName={filterName}
            />
          )}
        </Column>
      </Row>
    </React.Fragment>
  );
};
