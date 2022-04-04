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
   height: 26px; 
   width: 26px;
   margin: 3px; 
  }
  20% { 
   height: 20px; 
   width: 20px;
   margin: 6px; 
    }
 30% { 
   height: 28px; 
    width: 28px;  
    margin: 2px;
}
 100% { 
   height: 26px; 
   width: 26px;
   margin: 3px; 
 }
`;

export const StyledNote = styled.div`
  height: 24px;
  width: 24px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 3px 3px 5px ${(props) => props.color};
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.highlighted ? 0.5 : 1)};
  cursor: pointer;
  &:hover {
    height: ${(props) => (props.clickable ? "18px" : "24px")};
    width: ${(props) => (props.clickable ? "18px" : "24px")};
    margin: ${(props) => (props.clickable ? "6px" : "3px")};
  }
  animation-name: ${(props) => props.animated && notesPlayingAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: 1;
`;

export const PageCircle = styled.div`
  height: 8px;
  width: 8px;
  margin: 4px;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  border-color: ${(props) => props.color || "black"};
  background-color: ${(props) =>
    props.selected ? props.color || "black" : "white"};
  cursor: pointer;
`;

export const BarIndicator = styled.div`
  border-bottom: 1px solid #aaa;
  width: ${(props) => props.width || "138px"};
  height: ${(props) => props.height || "default"};
  margin: 0px 3px 12px 3px;
  font-size: 10px;
  color: #aaa;
`;
