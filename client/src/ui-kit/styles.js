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
  max-width: 800px;
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
