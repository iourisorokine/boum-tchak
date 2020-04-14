import styled from "styled-components";

export const Button = styled.button`
  height: 36px;
  min-width: 40px;
  margin: 8px;
  padding: 0px 10px;
  border-radius: 3px;
  border: solid 1px black;
  background-color: #fff;
  font-size: 16px;
  &:hover {
    background-color: #7799dd;
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

export const ControlsPad = styled.div`
  padding: 10px;
`;

export const Tempo = styled.span`
  font-size: 16px;
`;

export const HeaderTitle = styled.h1`
  padding: 0px 50px;
  font-size: 56px;
  text-shadow: 4px 4px #7799dd;
`;

export const HeaderLayout = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
`;

export const ButtonMenu = styled.div`
  margin: 10px;
  border: solid 2px black;
  padding: 10px 20px;
  color: #000;
  text-decoration: none;
  &:hover {
    background-color: #7799dd;
  }
`;

export const MusicGrid = styled.div`
  margin: 20px;
  padding-bottom: 20px;
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

export const Line = styled.div`
  margin: 0;
  display: flex;
`;

export const LineLabel = styled.p`
  font-size: 10px;
  line-height: 10px;
  width: 60px;
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
    background-color: #7799dd;
  }
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

export const StyledNote = styled.div`
  height: 30px;
  width: 30px;
  margin: 3px;
  box-shadow: 2px 2px 5px ${(props) => props.color};
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.highlighted ? 0.5 : 1)};
`;
