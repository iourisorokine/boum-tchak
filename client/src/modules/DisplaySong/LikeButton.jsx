import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export const LikeButton = () => {
  const [currentStatus, setCurrentStatus] = useState("inactive");
  const style = {
    color: currentStatus === "inactive" ? "black" : "white",
    backgroundColor: currentStatus === "inactive" ? "white" : "black",
    padding: 6,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: "50%",
    cursor: "pointer",
  };
  const handleClick = () => {
    setCurrentStatus(currentStatus === "inactive" ? "active" : "inactive");
  };

  return (
    <FontAwesomeIcon
      icon={faMusic}
      color="black"
      style={style}
      onClick={handleClick}
    />
  );
};
