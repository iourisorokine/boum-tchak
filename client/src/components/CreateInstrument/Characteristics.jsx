import React from "react";
import { Row, Column, Input, Select, Option } from "../../ui-kit";

export const Characteristics = ({
  name,
  setName,
  setCategory,
  subCategory,
  setSubCategory,
}) => {
  return (
    <React.Fragment>
      <Row>
        <Column flex={1}>Name:</Column>
        <Column justifyContent="flex-start" flex={2}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Column>
      </Row>
      <Row>
        <Column flex={1}>Category:</Column>
        <Column justifyContent="flex-start" flex={2}>
          <Select name="category" onChange={(e) => setCategory(e.target.value)}>
            <Option value="default" />
            <Option value="Bass">Bass</Option>
            <Option value="Drums">Drums</Option>
            <Option value="Synth">Synth</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Column>
      </Row>
      <Row>
        <Column flex={1}>Sub-category:</Column>
        <Column justifyContent="flex-start" flex={2}>
          <Input
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </Column>
      </Row>
    </React.Fragment>
  );
};
