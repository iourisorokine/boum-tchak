import React, { useState } from "react";
import { SoundsList } from "./SoundsList";
import axios from "axios";
import { Row, Column, Button, Input, PageLayout, Heading2 } from "../../ui-kit";

export const Characteristics = ({}) => {
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <Row>
        <Column flex={1}>Name:</Column>
        <Column justifyContent="flex-start" flex={2}>
          <Input type="text" />
        </Column>
      </Row>
      <Row>
        <Column flex={1}>Category:</Column>
        <Column justifyContent="flex-start" flex={2}>
          <Input type="text" />
        </Column>
      </Row>
      <Row>
        <Column flex={1}>Sub-category:</Column>
        <Column justifyContent="flex-start" flex={2}>
          <Input type="text" />
        </Column>
      </Row>
    </React.Fragment>
  );
};
