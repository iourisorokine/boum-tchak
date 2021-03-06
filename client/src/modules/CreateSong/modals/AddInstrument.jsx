import React, { useState, useEffect, useContext } from "react";
import { globalContext } from "../context/GlobalContext";
import { Bars } from "svg-loaders-react";
import { FixedSizeList } from "react-window";
import {
  CategoryBtn,
  ExpandedMenuItem,
  Column,
  Row,
  Button,
  SelectableRow,
  Text,
  Heading3,
} from "../../../ui-kit";
import axios from "axios";

export const AddInstrument = ({ addInstrument }) => {
  const [newInstruments, setNewInstruments] = useState([]);
  const [searchCategory, setSearchCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const { toggleIsAddInstrumentVisible } = useContext(globalContext);

  const fetchInstrumentsData = async (searchCat, shouldCreateBtns) => {
    const searchParams = searchCat && {
      params: { category: searchCat },
    };
    const { data } = await axios.get("/api/instrument", searchParams);
    if (data) {
      setNewInstruments(data);
      if (shouldCreateBtns) {
        const allCategories = data.map((instrument) => {
          return instrument.category;
        });
        const newUniqueCategories = [...new Set(allCategories)];
        setUniqueCategories(newUniqueCategories);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchInstrumentsData(null, true);
  }, []);

  const handleClick = (inst) => {
    addInstrument(inst);
    toggleIsAddInstrumentVisible();
  };

  const selectCategory = (cat) => {
    fetchInstrumentsData(cat);
    setSearchCategory(cat);
  };

  const ItemRow = ({ index, style }) => {
    const instrument = newInstruments[index];
    return (
      <SelectableRow
        style={style}
        bgColor={index % 2 === 0 ? "#eee" : "#fff"}
        padding="4px 0 4px 0"
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
  };

  return (
    <ExpandedMenuItem>
      <Row padding="10px 12px 4px 12px">
        <Heading3>Add Instrument</Heading3>
      </Row>
      <Row padding="10px 12px 4px 12px">
        <Column flexDirection="row">
          {uniqueCategories.map((cat) => {
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
      {loading && (
        <Column justifyContent="center" alignItems="center">
          <Bars width={100} height={50} fill="#000" stroke="#000" />
        </Column>
      )}
      <Row padding="4px 12px 0 12px">
        <Column>
          <FixedSizeList
            height={260}
            width={380}
            itemCount={newInstruments.length}
            itemSize={30}>
            {ItemRow}
          </FixedSizeList>
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
