import styled from "styled-components";

export const Heading2 = styled.h2`
  padding: 8px 0;
  margin: 0 0 8px 0;
`;

export const Heading3 = styled.h3`
  padding: 8px 0;
  margin: 0 0 4px 0;
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
  width: ${(props) => props.width || "70px"};
`;

export const Text = styled.p`
  font-size: 12px;
  line-height: 12px;
  padding: ${(props) => props.padding || 2};
  margin: 0;
`;

export const TextSpan = styled.span`
  font-size: 12px;
`;

export const HeaderTitle = styled.h1`
  padding: 0px 50px;
  font-size: 36px;
  text-shadow: 4px 4px #7799dd;
`;

export const Alert = styled.p`
  color: red;
`;

export const Caption = styled.p`
  color: ${(props) => props.color || "#888"};
  margin: ${(props) => props.margin || "4px 4px 4px 0px"};
  padding: ${(props) => props.padding || "default"};
  font-size: 14px;
`;
