import React, { useState, useEffect } from "react";
import { Bars } from "svg-loaders-react";
import { CategoryBtn, ExpandedMenuItem } from "../../ui-kit";
import axios from "axios";

export const AddInstrument = ({
  addInstrument,
  toggleIsAddInstrumentVisible,
}) => {
  const [newInstruments, setNewInstruments] = useState([]);
  const [searchCategory, setSearchCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const categories = ["Drums", "Bass", "Synth", "Guitar"];

  const fetchInstrumentsData = async (searchCat) => {
    const searchParams = searchCat && {
      params: { category: searchCat },
    };
    const { data } = await axios.get("/api/instrument", searchParams);
    if (data) {
      setNewInstruments(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchInstrumentsData();
  }, []);

  const handleClick = (inst) => {
    addInstrument(inst);
    toggleIsAddInstrumentVisible();
  };

  const selectCategory = (cat) => {
    fetchInstrumentsData(cat);
    setSearchCategory(cat);
  };

  return (
    <ExpandedMenuItem>
      {loading && <Bars width={100} height={50} fill="#000" stroke="#000" />}
      {categories.map((cat) => {
        if (cat !== "default") {
          return (
            <CategoryBtn
              key={cat}
              selected={searchCategory === cat}
              onClick={() => selectCategory(cat)}>
              {cat}
            </CategoryBtn>
          );
        }
      })}
      -------------------
      {newInstruments.map((instrument) => {
        return (
          <CategoryBtn
            key={instrument.name}
            onClick={() => handleClick(instrument)}>
            {instrument.name}
          </CategoryBtn>
        );
      })}
    </ExpandedMenuItem>
  );
};
