import styled from "styled-components";

export const Button = styled.button`
  height: 36px;
  min-width: 36px;
  margin: 8px;
  padding: 0px 10px;
  border-radius: 18px;
  border: solid 1px black;
  background-color: white;
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

export const ButtonMenu = styled.div`
  margin: 10px;
  border: solid 2px black;
  border-radius: 5px;
  padding: 10px 20px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const InstrumentBtn = styled.button`
  height: 30px;
  min-width: 40px;
  margin: 8px;
  padding: 0px 10px;
  border-radius: 15px;
  border: solid 1px black;
  background-color: #fff;
  font-size: 16px;
  &:hover {
    background-color: black;
    color: white;
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
