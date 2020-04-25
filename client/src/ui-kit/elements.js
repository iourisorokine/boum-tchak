import styled from "styled-components";

export const ControlsPad = styled.div`
  padding: 10px;
`;

export const Tempo = styled.span`
  font-size: 16px;
`;

export const ExpandedMenuItem = styled.div`
  margin: 5px;
  min-width: 300px;
  max-width: 700px;
  position: absolute;
  top: 150px;
  left: 20%;
  background-color: white;
  border: solid 1px black;
  border-radius: 3px;
  padding: 10px;
`;

export const SelectableItem = styled.div`
  width: 200px;
  height: 40px;
  padding-left: 10px;
  &:hover {
    background-color: #7799dd;
  }
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
  min-width: 100px;
  margin: 10px;
`;

export const Form = styled.form`
  border: solid black 1px;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
`;

export const Label = styled.label`
  margin: 0px 5px;
`;

export const ProfilePic = styled.img`
  src: ${(props) => props.src}
  height: 260px;
  width: 260px;
  object-fit: cover;
  padding: 10px;
`;
