import styled from "styled-components";

export const MusicGrid = styled.div`
  margin: 20px;
  padding-bottom: 20px;
`;

export const Line = styled.div`
  margin: 0;
  display: flex;
`;

export const StyledNote = styled.div`
  height: ${(props) => (props.highlighted ? "26px" : "30px")};
  width: ${(props) => (props.highlighted ? "26px" : "30px")};
  margin: ${(props) => (props.highlighted ? "5px" : "3px")};
  box-shadow: 2px 2px 5px ${(props) => props.color};
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.highlighted ? 0.8 : 1)};
  &:hover {
    height: ${(props) => (props.clickable ? "24px" : "30px")};
    width: ${(props) => (props.clickable ? "24px" : "30px")};
    margin: ${(props) => (props.clickable ? "6px" : "3px")};
  }
`;
