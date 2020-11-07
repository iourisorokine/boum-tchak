import styled from "styled-components";

export const ControlsPad = styled.div`
  padding: 10px;
`;

export const Tempo = styled.span`
  font-size: 16px;
`;

export const ExpandedMenuItem = styled.div`
  margin: auto;
  min-width: 400px;
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

export const SongPostPlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  margin-top: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
`;

export const SongPost = styled.div`
  position: relative;
  margin: 30px 10px;
  border: solid 1px black;
  border-radius: 10px;
  padding-top: 10px;
  width: 80%;
  &:hover ${SongPostPlay} {
    visibility: visible;
  }
`;

export const Input = styled.input`
  height: 24px;
  width: ${(props) => props.width || "100px"};
  margin: 10px;
  border: 1px solid black;
  border-radius: 4px;
`;

export const Form = styled.form`
  border: solid black 1px;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
`;

export const Label = styled.label`
  margin: 0px 5px;
`;

export const Select = styled.select`
  margin: 8px;
  height: 26px;
  width: ${(props) => props.width || "110px"};
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
  margin: 0px;
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : "black")};
  background-color: ${(props) => (props.selected ? "black" : "white")};
  &:hover {
    background-color: black;
    color: white;
  }
`;
