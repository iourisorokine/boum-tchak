import React from "react";
import { getCategories, getSubCategories } from "../utils";
import { Row, Column, Input, Select, Option } from "../../ui-kit";

export const Characteristics = ({
  name,
  setName,
  category,
  setCategory,
  subCategory,
  setSubCategory,
}) => {
  const instrumentCategories = getCategories();

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
          <Select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            {instrumentCategories.map((cat, i) => {
              return (
                <Option key={i} value={cat}>
                  {cat !== "default" && cat}
                </Option>
              );
            })}
          </Select>
        </Column>
      </Row>
      <Row>
        <Column flex={1}>Sub-category:</Column>
        <Column justifyContent="flex-start" flex={2}>
          <Select
            name="sub-category"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}>
            {getSubCategories(category).map((subCat, i) => {
              return (
                <Option key={i} value={subCat}>
                  {subCat}
                </Option>
              );
            })}
          </Select>
        </Column>
      </Row>
    </React.Fragment>
  );
};
