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
  height: 30px;
  width: 30px;
  margin: 3px;
  box-shadow: 2px 2px 5px ${(props) => props.color};
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.highlighted ? 0.5 : 1)};
`;