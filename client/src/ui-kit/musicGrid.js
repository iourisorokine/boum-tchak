import styled, { keyframes } from "styled-components";

export const MusicGrid = styled.div`
  margin: 10px 20px;
  padding-bottom: 10px;
`;

export const Line = styled.div`
  margin: 0;
  display: flex;
`;

const notesPlayingAnimation = keyframes`
 0% { 
   height: 30px; 
   width: 30px;
   margin: 3px; 
  }
  20% { 
   height: 24px; 
   width: 24px;
   margin: 6px; 
    }
 30% { 
   height: 32px; 
    width: 32px;  
    margin: 2px;
}
 100% { 
   height: 30px; 
   width: 30px;
   margin: 3px; 
 }
`;

export const StyledNote = styled.div`
  height: 30px;
  width: 30px;
  margin: 3px;
  box-shadow: 3px 3px 5px ${(props) => props.color};
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.highlighted ? 0.7 : 1)};
  cursor: pointer;
  &:hover {
    height: ${(props) => (props.clickable ? "24px" : "30px")};
    width: ${(props) => (props.clickable ? "24px" : "30px")};
    margin: ${(props) => (props.clickable ? "6px" : "3px")};
  }
  animation-name: ${(props) => props.animated && notesPlayingAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: 1;
`;

export const PageSquare = styled.div`
  height: 8px;
  width: 8px;
  margin: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) => props.color || "black"};
  background-color: ${(props) =>
    props.selected ? props.color || "black" : "white"};
  cursor: pointer;
`;

export const BarIndicator = styled.div`
  border-bottom: 1px solid #aaa;
  width: 138px;
  margin: 0px 3px 12px 3px;
  font-size: 10px;
  color: #aaa;
`;
