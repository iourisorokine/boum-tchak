import React, { useState } from "react";
import axios from "axios";
import { Row, Column, Input, Button } from "../../ui-kit";

export const CreateSound = () => {
  const [soundName, setSoundName] = useState("");
  const [soundCategory, setSoundCategory] = useState("");
  const [soundSubCategory, setSoundSubCategory] = useState("");
  const [soundFile, setSoundFile] = useState(null);

  const fileSelectorHandler = (event) => {
    console.log(event.target.files[0]);
    const selectedFile = event.target.files[0];
    setSoundFile(selectedFile);
  };

  const uploadSound = async () => {
    const uploadData = new FormData();
    uploadData.append("sounds", soundFile);
    const addedSound = await axios.post("/api/sound/upload", uploadData);
    console.log(addedSound);
  };

  return (
    <Row>
      <Column flex={2}>
        <Input
          type="text"
          value={soundName}
          onChange={(e) => setSoundName(e.target.value)}
        />
      </Column>
      <Column flex={2}>
        <Input
          type="text"
          value={soundCategory}
          onChange={(e) => setSoundCategory(e.target.value)}
        />
      </Column>
      <Column flex={2}>
        <Input
          type="text"
          value={soundSubCategory}
          onChange={(e) => setSoundSubCategory(e.target.value)}
        />
      </Column>
      <Column flex={1}>
        <Input
          id="file"
          name="file"
          type="file"
          multiple="false"
          onChange={fileSelectorHandler}
        />
        <Button onClick={uploadSound}>Upload</Button>
      </Column>
    </Row>
  );
};
