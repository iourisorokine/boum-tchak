import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { Bars } from "svg-loaders-react";
import { getCategories, getSubCategories } from "../utils";
import {
  Row,
  Column,
  SelectableText,
  Heading3,
  Select,
  Option,
  Input,
} from "../../ui-kit";

export const AvailableSoundsList = ({
  loading,
  availableSounds,
  selectedSound,
  selectSound,
}) => {
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("default");
  const [filterSubCategory, setFilterSubCategory] = useState("");

  const filteredSounds = availableSounds.filter((sound) => {
    return (
      (!filterName ||
        sound.name
          .toLocaleLowerCase()
          .includes(filterName.toLocaleLowerCase())) &&
      (filterCategory === "default" || filterCategory === sound.category)&& (!filterSubCategory || filterSubCategory === sound.subCategory)
    );
  });

  const volumeBtnStyle = {
    margin: 2,
    color: "black",
    backgroundColor: "white",
    padding: 6,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: "50%",
    cursor: "pointer",
  };

  const soundCategories = getCategories();

  if (loading) {
    return (
      <Column alignItems="center">
        <Bars width={100} height={50} fill="#000" stroke="#000" />
      </Column>
    );
  }
  return (
    <React.Fragment>
      <Row>
        <Column></Column>
        <Column flex={3}>
          <Heading3>Name</Heading3>
          <Input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Column>
        <Column flex={2}>
          <Heading3>Category</Heading3>
          <Select
            name="category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}>
            {soundCategories.map((cat, i) => {
              return (
                <Option key={i} value={cat}>
                  {cat === "default" ? "all" : cat}
                </Option>
              );
            })}
          </Select>
        </Column>
        <Column flex={2}>
          <Heading3>Sub-cat.</Heading3>
          <Select
            name="sub-category"
            value={filterSubCategory}
            onChange={(e) => setFilterSubCategory(e.target.value)}>
            {getSubCategories(filterCategory).map((subCat, i) => {
              return (
                <Option key={i} value={subCat}>
                  {subCat || "all"}
                </Option>
              );
            })}
          </Select>
        </Column>
      </Row>
      {filteredSounds.map((el) => {
        const playSound = () => {
          return new Audio(el.url).play();
        };
        return (
          <Row key={el._id}>
            <Column>
              <FontAwesomeIcon
                icon={faVolumeUp}
                style={volumeBtnStyle}
                onClick={playSound}
              />
            </Column>
            <Column flex={3}>
              <SelectableText
                selected={selectedSound === el.url}
                onClick={() => selectSound(el.url)}>
                {el.name}
              </SelectableText>
            </Column>
            <Column flex={2}>
              <SelectableText
                selected={selectedSound === el.url}
                onClick={() => selectSound(el.url)}>
                {el.category}
              </SelectableText>
            </Column>
            <Column flex={2}>
              <SelectableText
                selected={selectedSound === el.url}
                onClick={() => selectSound(el.url)}>
                {el.subCategory}
              </SelectableText>
            </Column>
          </Row>
        );
      })}
    </React.Fragment>
  );
};
