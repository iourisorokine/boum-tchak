import styled from "styled-components";

export const Row = styled.div`
  padding: ${(props) => props.padding || 0};
  display: flex;
  width: 100%;
`;

export const SelectableRow = styled(Row)`
  padding: ${(props) => props.padding || 0};
  cursor: pointer;
  color: ${(props) => (props.selected ? "white" : "black")};
  background-color: ${(props) => (props.selected ? "black" : "white")};
  &:hover {
    background-color: ${(props) =>
      props.noHoverHighlight && !props.selected ? "white" : "black"};
    color: ${(props) =>
      props.noHoverHighlight && !props.selected ? "black" : "white"};
    opacity: ${(props) => (props.selected ? 0.5 : 1)};
  }
`;

export const AppIntroLayout = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "column"};
  justify-content: center;
  min-height: 20px;
  padding: ${(props) => props.padding || 0};
  align-items: ${(props) => props.alignItems || "flex-start"};
  justify-content: ${(props) => props.justifyContent || "center"};
  flex: ${(props) => props.flex || 1};
`;

export const HeaderLayout = styled.div`
  height: 70px;
  width: 100vw;
  z-index: 10;
  background-color: white;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 5px #eee;
`;

export const BackHeader = styled.div`
  height: 110px;
`;

export const MainScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "column"};
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  width: 100vw;
  max-width: ${(props) => props.maxWidth || "900px"};
`;

export const PageLayout = styled.div`
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flexStart;
`;

export const BlankSpace = styled.div`
  height: ${(props) => props.height || "20px"};
`;
