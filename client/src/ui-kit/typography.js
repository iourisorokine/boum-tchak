import styled from "styled-components";

export const Heading2 = styled.h2`
  padding: 10px 0;
  margin: 0 0 10px 0;
`;

export const SongHeader = styled.div`
  margin-top: -32px;
  padding: 0px 12px;
  display: flex;
  justify-content: space-between;
`;

export const SongTitle = styled.p`
  padding: 0px 10px;
  background-color: white;
  font-weight: ${(props) => (props.b ? "bold" : "regular")};
  font-size: 12px;
`;

export const LineLabel = styled.p`
  font-size: 10px;
  line-height: 10px;
  width: 60px;
`;

export const HeaderTitle = styled.h1`
  padding: 0px 50px;
  font-size: 56px;
  text-shadow: 4px 4px #7799dd;
`;

export const Alert = styled.p`
  color: red;
`;
