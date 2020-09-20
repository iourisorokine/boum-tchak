import React, { useState, useEffect } from "react";
import { Bars } from "svg-loaders-react";
import {
  CategoryBtn,
  ExpandedMenuItem,
  Column,
  Row,
  Button,
  SelectableRow,
  Text,
} from "../../ui-kit";
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
      <Row padding="10px 12px 4px 12px">
        <Column flexDirection="row">
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
        </Column>
      </Row>
      <Row padding="4px 12px 0 12px">
        <Column>
          {loading && (
            <Bars width={100} height={50} fill="#000" stroke="#000" />
          )}
          {newInstruments.map((instrument) => {
            return (
              <SelectableRow
                key={instrument.name}
                padding="4px"
                onClick={() => handleClick(instrument)}>
                <Column flex={2}>
                  <Text>{instrument.name}</Text>
                </Column>
                <Column>
                  <Text>{instrument.category}</Text>
                </Column>
                <Column>
                  <Text>{instrument.subCategory}</Text>
                </Column>
              </SelectableRow>
            );
          })}
        </Column>
      </Row>
      <Row padding="20px 0 10px 0">
        <Column alignItems="center">
          <Button hoverColor="red" onClick={toggleIsAddInstrumentVisible}>
            Cancel
          </Button>
        </Column>
      </Row>
    </ExpandedMenuItem>
  );
};
