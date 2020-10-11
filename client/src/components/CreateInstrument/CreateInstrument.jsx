import React, { useState } from "react";
import { Characteristics } from "./Characteristics";
import { InstrumentSoundsList } from "./InstrumentSoundsList";
import { AddSound } from "./AddSound";
import { SketchPicker } from "react-color";
import { gradientBuilder } from "../utils";
import axios from "axios";
import {
  Row,
  Column,
  Button,
  PageLayout,
  Heading2,
  Alert,
  CategoryBtn,
} from "../../ui-kit";

const views = {
  OVERVIEW: "OVERVIEW",
  ADD_SOUND: "ADD_SOUND",
};

export const CreateInstrument = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [message, setMessage] = useState("");
  const [sounds, setSounds] = useState([
    { name: "default", color: "#ddd", url: "" },
  ]);
  const [view, setView] = useState(views.OVERVIEW);
  const [loading, setLoading] = useState(false);
  const [availableSounds, setAvailableSounds] = useState([]);
  const [selectedSound, setSelectedSound] = useState(null);
  const [editedColor, setEditedColor] = useState("start");
  const [startColor, setStartColor] = useState("#aaaaaa");
  const [endColor, setEndColor] = useState("#555555");
  const [pickerColor, setPickerColor] = useState("#aaaaaa");

  const handleColorChange = (color) => {
    setPickerColor(color.hex);
    if (editedColor === "start") {
      setStartColor(color.hex);
    } else if (editedColor === "end") {
      setEndColor(color.hex);
    }
    updateSoundsColors();
  };

  const updateSoundsColors = () => {
    const updatedSounds = [...sounds];
    const l = updatedSounds.length;
    if (l === 1) return;
    if (l >= 2) updatedSounds[1].color = startColor;
    if (l >= 3) updatedSounds[l - 1].color = endColor;
    if (l > 3) {
      const gradient = gradientBuilder(startColor, endColor, l - 3);
      for (let i = 2; i < l - 1; i++) {
        updatedSounds[i].color = gradient[i - 2];
      }
    }
    setSounds(updatedSounds);
  };

  const openAddSoundSection = async () => {
    setView(views.ADD_SOUND);
    await fetchData();
  };

  const fetchData = async () => {
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
    }, 2000);
  };

  const addSound = (sound) => {
    if ((!sound.url, !sound.color)) {
      displayMessage("Please select or upload a sound and pick a color");
      return;
    }
    const newSound = {
      name: sound.name,
      color: sound.color,
      url: sound.url,
    };
    const updatedSounds = [...sounds, newSound];
    setSounds(updatedSounds);
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
    setSounds([{ name: "default", color: "#ddd", url: "" }]);
  };

  const saveInstrument = async () => {
    if (!name || !category || !subCategory) {
      displayMessage("All fields must be filled");
      return;
    }
    if (sounds.length < 2) {
      displayMessage("You must select at least 1 sound");
      return;
    }
    const createdInstrument = await axios.post("/api/instrument", {
      name,
      category,
      subCategory,
      sounds,
      creator: props.user._id,
      private: false,
    });
    if (createdInstrument.message) {
      displayMessage(createdInstrument.message);
    } else if (createdInstrument.status === 200) {
      displayMessage(`Success! You just created a new instrument!`);
      resetInstrument();
    }
  };

  const toggleHelp = () => {};

  return (
    <PageLayout>
      <Row>{message && <Alert>{message}</Alert>}</Row>
      {view === views.ADD_SOUND && (
        <AddSound
          switchToOverview={switchToOverview}
          availableSounds={availableSounds}
          selectedSound={selectedSound}
          selectSound={selectSound}
          loading={loading}
          addSound={addSound}
          fetchData={fetchData}
          displayMessage={displayMessage}
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
              <Row>
                <Column>
                  <h3>Sounds:</h3>
                </Column>
              </Row>
              <Row>
                <Column>
                  <InstrumentSoundsList
                    sounds={sounds}
                    addSound={openAddSoundSection}
                  />
                </Column>
              </Row>
            </Column>
            <Column flex={1}>
              <SketchPicker
                color={pickerColor}
                onChangeComplete={handleColorChange}
              />
              <Row>
                <Column
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-start">
                  <CategoryBtn
                    selected={editedColor === "start"}
                    onClick={() => setEditedColor("start")}>
                    Pick start color
                  </CategoryBtn>
                  <CategoryBtn
                    selected={editedColor === "end"}
                    onClick={() => setEditedColor("end")}>
                    Pick end color
                  </CategoryBtn>
                </Column>
              </Row>
            </Column>
          </Row>
        </React.Fragment>
      )}
    </PageLayout>
  );
};
