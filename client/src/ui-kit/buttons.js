import styled from "styled-components";

export const Button = styled.button`
  height: 36px;
  min-width: 36px;
  margin: 8px;
  padding: 0px 10px;
  border-radius: 18px;
  border: solid 1px black;
  background-color: ${(props) => props.backgroundColor || "white"};
  font-size: 16px;
  box-shadow: 3px 3px 5px #bbb;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const PlayButton = styled(Button)`
  width: 60px;
  background-color: #0f0;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const StopButton = styled(Button)`
  width: 60px;
  background-color: #f00;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const MenuButton = styled.div`
  margin: 8px;
  border: solid 2px black;
  border-radius: 5px;
  padding: 6px 12px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const CategoryBtn = styled.button`
  height: 30px;
  min-width: 40px;
  margin: 8px;
  padding: 0px 10px;
  border-radius: 15px;
  border: solid 1px black;
  color: ${(props) => (props.selected ? "white" : "black")};
  background-color: ${(props) => (props.selected ? "black" : "white")};
  font-size: 12px;
  &:hover {
    background-color: black;
    color: white;
    opacity: ${(props) => (props.selected ? 0.5 : 1)};
  }
`;

export const DeleteButton = styled.p`
  line-height: 10px;
  padding: 3px;
  margin: 5px;
  font-size: 25px;
  color: red;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const IconButton = styled.button`
  color: black;
  backgroundcolor: white;
  padding: 6px;
  bordercolor: black;
  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
`;
