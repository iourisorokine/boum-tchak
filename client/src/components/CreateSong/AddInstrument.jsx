import React, { useState, useEffect } from "react";
import { InstrumentBtn, ExpandedMenuItem } from "../../ui-kit";
import axios from "axios";

export const AddInstrument = ({
  addInstrument,
  toggleIsAddInstrumentVisible,
}) => {
  const [newInstruments, setNewInstruments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchInstrumentsData = async () => {
      const { data } = await axios.get("/api/instrument");
      setNewInstruments(data);
      setLoading(false);
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
