import React, { useState } from "react";
import { Characteristics } from "./Characteristics";
import { InstrumentSoundsList } from "./InstrumentSoundsList";
import { AddSound } from "./AddSound";
import axios from "axios";
import { Row, Column, Button, PageLayout, Heading2, Alert } from "../../ui-kit";

const views = {
  OVERVIEW: "OVERVIEW",
  ADD_SOUND: "ADD_SOUND",
};

export const CreateInstrument = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [message, setMessage] = useState("");
  const [sounds, setSounds] = useState([""]);
  const [colors, setColors] = useState(["#ddd"]);
  const [view, setView] = useState(views.OVERVIEW);
  const [loading, setLoading] = useState(false);
  const [availableSounds, setAvailableSounds] = useState([]);
  const [selectedSound, setSelectedSound] = useState(null);

  const openAddSoundSection = async () => {
    setView(views.ADD_SOUND);
    setLoading(true);
    const { data } = await axios.get("/api/sound");
    if (data) {
      setAvailableSounds(data);
      setLoading(false);
    }
  };

  const displayMessage = (mes) => {
    setMessage(mes);
    setInterval(() => {
      setMessage("");
    }, 3000);
  };

  const addSound = (soundUrl, colorHex) => {
    const updatedSounds = [...sounds, soundUrl];
    const updatedColors = [...colors, colorHex];
    setSounds(updatedSounds);
    setColors(updatedColors);
    setView(views.OVERVIEW);
  };

  const switchToOverview = () => {
    setView(views.OVERVIEW);
  };

  const selectSound = (sound) => {
    setSelectedSound(sound);
  };

  const resetInstrument = () => {
    setName("");
    setCategory("");
    setSubCategory("");
    setSounds([""]);
    setColors(["#ddd"]);
  };

  const saveInstrument = async () => {
    if (!name || !category || !subCategory) {
      displayMessage("All fields must be filled");
      return;
    }
    if (sounds.length < 2 || colors.length < 2) {
      displayMessage("You must select at least 1 sound");
      return;
    }
    const createdInstrument = await axios.post("/api/instrument", {
      name,
      category,
      subCategory,
      sounds,
      colors,
      creator: props.user._id,
      private: false,
    });
    if (createdInstrument.message) {
      displayMessage(createdInstrument.message);
    } else if (createdInstrument.data.status === 200) {
      console.log(createdInstrument);
      displayMessage(`Success! You just created a new instrument!`);
      resetInstrument();
    }
  };

  const toggleHelp = () => {};

  return (
    <PageLayout>
      {view === views.ADD_SOUND && (
        <AddSound
          switchToOverview={switchToOverview}
          availableSounds={availableSounds}
          selectedSound={selectedSound}
          selectSound={selectSound}
          loading={loading}
          addSound={addSound}
        />
      )}
      {view === views.OVERVIEW && (
        <React.Fragment>
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
              <Button onClick={resetInstrument}>Reset</Button>
              <Button onClick={toggleHelp}>Help</Button>
            </Column>
          </Row>
          <Row>
            <Column flex={2}>
              <Characteristics
                name={name}
                setName={setName}
                category={category}
                setCategory={setCategory}
                subCategory={subCategory}
                setSubCategory={setSubCategory}
              />
            </Column>
            <Column flex={1}>{message && <Alert>{message}</Alert>}</Column>
          </Row>
          <Row>
            <Column>
              <h3>Sounds:</h3>
            </Column>
          </Row>
          <Row>
            <Column>
              <InstrumentSoundsList
                colors={colors}
                sounds={sounds}
                addSound={openAddSoundSection}
              />
            </Column>
          </Row>
        </React.Fragment>
      )}
    </PageLayout>
  );
};
