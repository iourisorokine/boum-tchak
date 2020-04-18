import styled from "styled-components";

export const ControlsPad = styled.div`
  padding: 10px;
`;

export const Tempo = styled.span`
  font-size: 16px;
`;

export const HeaderLayout = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
`;

export const MainScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

export const ExpandedMenuItem = styled.div`
  margin: 5px;
  min-width: 300px;
  border: solid 1px black;
  border-radius: 3px;
  padding: 10px;
`;

export const SelectableItem = styled.div`
  width: 200px;
  height: 30px;
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
  margin: 10px;
`;

export const Form = styled.form`
  border: solid black 1px;
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
`;

export const Label = styled.label`
  margin: 0px 5px;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : "flex-start"};
  flex: ${(props) => (props.flex ? props.flex : 1)};
`;
