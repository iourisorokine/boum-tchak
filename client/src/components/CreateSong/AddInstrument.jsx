import React, { useState, useEffect } from "react";
import { InstrumentBtn, ExpandedMenuItem } from "../../ui-kit";
import axios from "axios";

export const AddInstrument = ({
  addInstrument,
  toggleIsAddInstrumentVisible,
}) => {
  const [newInstruments, setNewInstruments] = useState([]);
  useEffect(() => {
    const fetchInstrumentsData = async () => {
      const { data } = await axios.get("/api/instrument");
      setNewInstruments(data);
    };
    fetchInstrumentsData();
  }, []);

  const handleClick = (inst) => {
    addInstrument(inst);
    toggleIsAddInstrumentVisible();
  };

  console.log(newInstruments);
  return (
    <ExpandedMenuItem>
      {newInstruments.map((instrument) => {
        return (
          <InstrumentBtn
            key={instrument.name}
            onClick={() => handleClick(instrument)}>
            {instrument.name}
          </InstrumentBtn>
        );
      })}
    </ExpandedMenuItem>
  );
};
