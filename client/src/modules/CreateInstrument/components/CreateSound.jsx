import React, { useState } from "react";
import axios from "axios";
import { Row, Column, Input, Button, Select, Option } from "../../../ui-kit";
import { getCategories, getSubCategories } from "../../utils";

export const CreateSound = ({ setView, fetchData }) => {
  const [soundName, setSoundName] = useState("");
  const [soundCategory, setSoundCategory] = useState("");
  const [soundSubCategory, setSoundSubCategory] = useState("");
  const [soundPitch, setSoundPitch] = useState("");
  const [soundFile, setSoundFile] = useState(null);
  const [message, setMessage] = useState("");

  const fileSelectorHandler = (event) => {
    const selectedFile = event.target.files[0];
    setSoundFile(selectedFile);
  };

  const uploadSound = async () => {
    if (!soundName || !soundCategory || !soundSubCategory) {
      displayMessage("Please chose a name and select categories");
      return;
    } else if (soundName.length < 5) {
      displayMessage("The sound name must be at least 5 char.");
    } else if (!soundFile) {
      displayMessage("please select a file to upload");
      return;
    }
    const uploadData = new FormData();
    uploadData.append("sounds", soundFile);
    const uploadedSound = await axios.post("/api/sound/upload", uploadData);
    const createdSound = await axios.post("/api/sound", {
      name: soundName,
      category: soundCategory,
      subCategory: soundSubCategory,
      pitch: soundPitch,
      url: uploadedSound.data.secure_url,
    });
    if (createdSound.message) {
      displayMessage(createdSound.message);
      return;
    }
    setView("ADD");
    fetchData();
  };

  const soundCategories = getCategories();

  const displayMessage = (mes) => {
    setMessage(mes);
    setInterval(() => {
      setMessage("");
    }, 3000);
  };
  return (
    <React.Fragment>
      <Row>
        <Column>Select file:</Column>
        <Column flex={2}>
          <Input
            id="file"
            name="file"
            type="file"
            multiple="false"
            onChange={fileSelectorHandler}
          />
        </Column>
      </Row>
      <Row>
        <Column>Name:</Column>
        <Column flex={2}>
          <Input
            type="text"
            value={soundName}
            onChange={(e) => setSoundName(e.target.value)}
          />
        </Column>
      </Row>
      <Row>
        <Column>Category:</Column>
        <Column flex={2}>
          <Select
            name="category"
            onChange={(e) => setSoundCategory(e.target.value)}
          >
            {soundCategories.map((cat, i) => {
              return (
                <Option key={i} value={cat}>
                  {cat !== "default" && cat}
                </Option>
              );
            })}
          </Select>
        </Column>
      </Row>
      <Row>
        <Column>Sub-Category:</Column>
        <Column flex={2}>
          <Select
            name="sub-category"
            onChange={(e) => setSoundSubCategory(e.target.value)}
          >
            {getSubCategories(soundCategory).map((subCat, i) => {
              return (
                <Option key={i} value={subCat}>
                  {subCat}
                </Option>
              );
            })}
          </Select>
        </Column>
      </Row>
      <Row>
        <Column>Pitch (optional):</Column>
        <Column flex={2}>
          <Input
            type="text"
            value={soundPitch}
            onChange={(e) => setSoundPitch(e.target.value)}
          />
        </Column>
      </Row>
      <Row>
        <Column></Column>
        <Column flex={2}>{soundFile && soundFile.name}</Column>
      </Row>
      <Row>
        <Column>{message && message}</Column>
      </Row>
      <Row>
        <Column flex={1}>
          <Button onClick={uploadSound}>Create Sound</Button>
        </Column>
      </Row>
    </React.Fragment>
  );
};
