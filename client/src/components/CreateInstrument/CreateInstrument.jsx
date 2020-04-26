import React, { useState } from "react";
import { SoundsList } from "./SoundsList";
import { Row, Column, Button, Input, PageLayout, H2 } from "../../ui-kit";

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

export const CreateInstrument = (props) => {
  const [newInstrument, setNewInstrument] = useState(emptyInstrument);
  return (
    <PageLayout>
      <Row>
        <Column>
          <H2>Create Instrument</H2>
        </Column>
      </Row>
      <Row>
        <Column>Some tutorial here</Column>
      </Row>
      <Row>
        <Column>
          <Row>
            <Column flex={1}>Name:</Column>
            <Column justifyContent="flex-start" flex={2}>
              <Input type="text" />
            </Column>
          </Row>
          <Row>
            <Column flex={1}>Category:</Column>
            <Column justifyContent="flex-start" flex={2}>
              <Input type="text" />
            </Column>
          </Row>
          <Row>
            <Column flex={1}>Sub-category:</Column>
            <Column justifyContent="flex-start" flex={2}>
              <Input type="text" />
            </Column>
          </Row>
          <Row>
            <Column>
              <h3>Sounds:</h3>
            </Column>
          </Row>
          <SoundsList
            colors={newInstrument.colors}
            sounds={newInstrument.sounds}
          />
        </Column>
      </Row>
    </PageLayout>
  );
};
