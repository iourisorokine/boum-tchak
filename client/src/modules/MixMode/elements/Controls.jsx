import React, { useContext } from "react";
import { djContext } from "../context/DjContext";
import { MenuButton, Section, AverageEditBtn, Caption } from "../../../ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

const iconStyle = { width: 28, height: 28 };

export const Controls = ({ onPlayBtnPress, onStopBtnPress }) => {
  const { tempo, setTempo, isPlaying } = useContext(djContext);

  const onMinusTempoPress = () => {
    setTempo(tempo - 5);
  };
  const onPlusTempoPress = () => {
    setTempo(tempo + 5);
  };

  return (
    <Section>
      {isPlaying ? (
        <MenuButton
          variant="big"
          onClick={onStopBtnPress}
          backgroundColor="#f00"
        >
          <FontAwesomeIcon icon={faStop} color="white" style={iconStyle} />
        </MenuButton>
      ) : (
        <MenuButton
          variant="big"
          onClick={onPlayBtnPress}
          backgroundColor="#0f0"
        >
          <FontAwesomeIcon icon={faPlay} color="white" style={iconStyle} />
        </MenuButton>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 18px",
        }}
      >
        <AverageEditBtn onClick={onMinusTempoPress}>-</AverageEditBtn>
        <Caption>tempo: {tempo}</Caption>
        <AverageEditBtn onClick={onPlusTempoPress}>+</AverageEditBtn>
      </div>
    </Section>
  );
};
