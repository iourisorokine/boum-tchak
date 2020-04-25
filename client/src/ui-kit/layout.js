import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 20px;
  align-items: ${(props) => props.alignItems || "flex-start"};
  justify-content: ${(props) => props.justifyContent || "center"};
  flex: ${(props) => props.flex || 1};
`;

export const HeaderLayout = styled.div`
  height: 120px;
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
  height: 150px;
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
  max-width: 900px;
  border-left: ${(props) =>
    props.border === "yes" ? "1px solid black" : null};
  border-right: ${(props) =>
    props.border === "yes" ? "1px solid black" : null};
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
