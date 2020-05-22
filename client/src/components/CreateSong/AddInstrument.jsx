import React, { useState, useEffect } from "react";
import { Bars } from "svg-loaders-react";
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

  return (
    <ExpandedMenuItem>
      {loading && <Bars width={100} height={50} fill="#000" stroke="#000" />}
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
