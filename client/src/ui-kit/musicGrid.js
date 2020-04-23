import styled, { keyframes } from "styled-components";

export const MusicGrid = styled.div`
  margin: 20px;
  padding-bottom: 20px;
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
  box-shadow: 2px 2px 5px ${(props) => props.color};
  background-color: ${(props) => props.color};
  opacity: ${(props) => (props.highlighted ? 0.7 : 1)};
  &:hover {
    height: ${(props) => (props.clickable ? "24px" : "30px")};
    width: ${(props) => (props.clickable ? "24px" : "30px")};
    margin: ${(props) => (props.clickable ? "6px" : "3px")};
  }
  animation-name: ${(props) => props.animated && notesPlayingAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: 1;
`;
