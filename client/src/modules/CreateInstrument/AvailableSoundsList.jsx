import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { Bars } from "svg-loaders-react";
import { getCategories, getSubCategories } from "../utils";
import {
  Row,
  Column,
  Heading3,
  Select,
  Option,
  SelectableRow,
} from "../../ui-kit";

export const AvailableSoundsList = ({
  loading,
  availableSounds,
  selectedSound,
  selectSound,
  filterName,
}) => {
  const [filterCategory, setFilterCategory] = useState("default");
  const [filterSubCategory, setFilterSubCategory] = useState("");

  const filteredSounds = availableSounds.filter((sound) => {
    return (
      (!filterName ||
        sound.name
          .toLocaleLowerCase()
          .includes(filterName.toLocaleLowerCase())) &&
      (filterCategory === "default" || filterCategory === sound.category) &&
      (!filterSubCategory || filterSubCategory === sound.subCategory)
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
        <Column />
        <Column flex={2}>
          <Heading3>Name</Heading3>
        </Column>
        <Column flex={2} flexDirection="row" justifyContent="left">
          <Heading3>Category</Heading3>
          <Select
            name="category"
            width="60px"
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
        <Column flex={2} flexDirection="row" justifyContent="left">
          <Heading3>Sub-cat.</Heading3>
          <Select
            name="sub-category"
            width="60px"
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
        <Column flex={2}>
          <Heading3>Pitch</Heading3>
        </Column>
      </Row>
      {filteredSounds.map((el) => {
        const playSound = () => {
          return new Audio(el.url).play();
        };
        return (
          <SelectableRow
            selected={selectedSound && selectedSound.url === el.url}
            noHoverHighlight
            onClick={() => selectSound(el)}
            key={el._id}>
            <Column>
              <FontAwesomeIcon
                icon={faVolumeUp}
                style={volumeBtnStyle}
                onClick={playSound}
              />
            </Column>
            {["name", "category", "subCategory", "pitch"].map(
              (columnTitle, index) => {
                return (
                  <Column key={index} flex={2}>
                    {el[columnTitle]}
                  </Column>
                );
              }
            )}
          </SelectableRow>
        );
      })}
    </React.Fragment>
  );
};
