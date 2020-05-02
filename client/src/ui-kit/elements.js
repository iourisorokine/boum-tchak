import styled from "styled-components";

export const ControlsPad = styled.div`
  padding: 10px;
`;

export const Tempo = styled.span`
  font-size: 16px;
`;

export const ExpandedMenuItem = styled.div`
  margin: auto;
  min-width: 300px;
  max-width: 700px;
  position: absolute;
  z-index: 10;
  top: 150px;
  box-shadow: 3px 3px 5px #bbb;
  background-color: white;
  border: solid 1px black;
  border-radius: 3px;
  padding: 10px;
`;

export const SongPost = styled.div`
  margin: 30px 10px;
  border: solid 1px black;
  border-radius: 10px;
  padding-top: 10px;
  width: 80%;
`;

export const Input = styled.input`
  height: 20px;
  width: ${(props) => props.width || "100px"};
  margin: 10px;
`;

export const Form = styled.form`
  border: solid black 1px;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
`;

export const Label = styled.label`
  margin: 0px 5px;
`;

export const Select = styled.select`
  margin: 4px 10px;
  height: 20px;
  width: ${(props) => props.width || "100px"};
`;

export const Option = styled.option`
  font-size: 12px;
`;

export const ProfilePic = styled.img`
  src: ${(props) => props.src}
  height: 260px;
  width: 260px;
  object-fit: cover;
  padding: 10px;
`;

export const ColorSquare = styled.div`
  height: 24px;
  width: 24px;
  margin: 4px;
  border: solid black 1px;
  background-color: ${(props) => props.backgroundColor || "white"};
`;

export const SelectableText = styled.p`
  padding: 3px;
  margin: 0;
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : "black")};
  background-color: ${(props) => (props.selected ? "black" : "white")};
  &:hover {
    background-color: black;
    color: white;
  }
`;
