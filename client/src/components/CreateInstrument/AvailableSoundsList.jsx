import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { Bars } from "svg-loaders-react";
import { Row, Column, SelectableText } from "../../ui-kit";

export const AvailableSoundsList = ({
  loading,
  availableSounds,
  selectedSound,
  selectSound,
}) => {
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
  return (
    <React.Fragment>
      {loading && (
        <Column alignItems="center">
          <Bars width={100} height={50} fill="#000" stroke="#000" />
        </Column>
      )}
      {availableSounds.map((el) => {
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
