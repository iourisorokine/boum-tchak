import React, { useState } from "react";
import { Characteristics } from "./Characteristics";
import { SoundsList } from "./SoundsList";
import { AddSound } from "./AddSound";
import axios from "axios";
import { Row, Column, Button, PageLayout, Heading2 } from "../../ui-kit";

const emptyInstrument = {
  name: "Bass",
  colors: ["#ddd", "#733", "#944", "#b55", "#d55"],
  category: "Bass",
  subCategory: "Divers",
  sounds: [
    "",
    "https://res.cloudinary.com/dibw9hzlc/video/upload/v1587846555/sounds/bass/Fusion-Acoustic-Bass-C2_afhrtm.wav",
    "https://res.cloudinary.com/dibw9hzlc/video/upload/v1587846555/sounds/bass/Fusion-Fretless-Bass-C3_gbeay3.wav",
    "https://res.cloudinary.com/dibw9hzlc/video/upload/v1587846554/sounds/bass/Synth-bass1-C2_tupsvj.wav",
    "https://res.cloudinary.com/dibw9hzlc/video/upload/v1587846553/sounds/bass/Electric-bass1_mdc5at.wav",
  ],
};

const views = {
  OVERVIEW: "OVERVIEW",
  ADD_SOUND: "ADD_SOUND",
};

export const CreateInstrument = (props) => {
  const [newInstrument, setNewInstrument] = useState(emptyInstrument);
  const [view, setView] = useState(views.OVERVIEW);
  const [loading, setLoading] = useState(false);

  const addSound = async () => {
    setView(views.ADD_SOUND);
    const { data } = await axios.get("/api/sound");
    console.log(data);
  };

  const switchToOverview = () => {
    setView(views.OVERVIEW);
  };

  const saveInstrument = () => {};
  const toggleHelp = () => {};

  return (
    <PageLayout>
      <Row>
        <Column flex={1}>
          <Heading2>Create Instrument</Heading2>
        </Column>
        <Column
          flex={2}
          flexDirection="row"
          alignItems="flex-end"
          justifyContent="flex-end">
          <Button onClick={saveInstrument}>Save Instrument</Button>
          <Button onClick={toggleHelp}>Help</Button>
        </Column>
      </Row>
      <Row>
        <Column>
          <Characteristics />
          <Row>
            <Column>
              <h3>Sounds:</h3>
            </Column>
          </Row>
          {view === views.OVERVIEW && (
            <SoundsList
              colors={newInstrument.colors}
              sounds={newInstrument.sounds}
              addSound={addSound}
            />
          )}
          {view === views.ADD_SOUND && (
            <AddSound switchToOverview={switchToOverview} />
          )}
        </Column>
      </Row>
    </PageLayout>
  );
};
