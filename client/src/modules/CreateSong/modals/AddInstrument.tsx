import React, { FC, useState, useEffect, useContext } from "react";
import { globalContext } from "../context/GlobalContext";
// @ts-ignore:next-line
import { Bars } from "svg-loaders-react";
// @ts-ignore:next-line
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
import { Instrument } from "../../../types";

export interface ItemRowProps {
  index: number;
  style: any;
}

export interface AddIntrumentProps {
  addInstrument: any;
}

export const AddInstrument: FC<AddIntrumentProps> = ({ addInstrument }) => {
  const [newInstruments, setNewInstruments] = useState([]);
  const [searchCategory, setSearchCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  const { toggleIsAddInstrumentVisible } = useContext(globalContext);

  const fetchInstrumentsData = async (
    searchCat: string | null,
    shouldCreateBtns?: boolean
  ) => {
    const searchParams = searchCat && {
      params: { category: searchCat },
    };
    const { data } = await axios.get("/api/instrument", searchParams as any);
    if (data) {
      setNewInstruments(data);
      if (shouldCreateBtns) {
        const allCategories = data.map((instrument: any) => {
          return instrument.category;
        });
        const newUniqueCategories = [...(new Set(allCategories) as any)];
        setUniqueCategories(newUniqueCategories as any);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchInstrumentsData(null, true);
  }, []);

  const handleClick = (inst: any) => {
    addInstrument(inst);
    toggleIsAddInstrumentVisible();
  };

  const selectCategory = (cat: string | null) => {
    fetchInstrumentsData(cat);
    setSearchCategory(cat);
  };

  const ItemRow: FC<ItemRowProps> = ({ index, style }) => {
    const instrument: Instrument = newInstruments[index];
    return (
      <SelectableRow
        style={style}
        bgColor={index % 2 === 0 ? "#eee" : "#fff"}
        padding="4px 0 4px 0"
        onClick={() => handleClick(instrument)}
      >
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
                  onClick={() => selectCategory(cat)}
                >
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
            itemSize={30}
          >
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
