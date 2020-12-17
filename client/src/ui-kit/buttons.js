import styled from "styled-components";

export const Button = styled.button`
  height: 36px;
  min-width: 36px;
  margin: 8px;
  padding: 0px 10px;
  border-radius: 18px;
  border: solid 1px black;
  background-color: ${(props) => props.backgroundColor || "white"};
  font-size: 14px;
  box-shadow: 3px 3px 5px #bbb;
  cursor: pointer;
  transition: background-color 0.7s, color 0.7s;
  &:hover {
    background-color: ${(props) => props.hoverColor || "black"};
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
  border: solid 1px black;
  border-radius: 5px;
  padding: 6px 12px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.7s, color 0.7s;
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
  color: ${(props)=> props.color || '#888'};
  border: 1px solid #aaa;
  margin: ${(props)=> props.margin || '4px 8px 4px 0px'};
  padding: ${(props)=> props.padding || '2px'};
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.5s, color 0.5s;
  &:hover {
    background-color: #f00;
    color: #fff;
  }
`;

export const IconButton = styled.button`
  color: black;
  backgroundcolor: white;
  padding: 6px;
  bordercolor: black;
  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
`;

export const SmallEditBtn = styled.button`
  color: ${(props)=> props.color || '#aaa'};
  border: 1px solid #aaa;
  margin: 4px 4px 4px 8px;
  background-color: #fff;
  border-radius: 4px;
  font-size: 12px;
  &:hover {
    background-color: #aaa;
    color: #fff;
  }
`;

export const AverageEditBtn = styled.button`
  color: ${(props)=> props.color || '#888'};
  border: 1px solid #aaa;
  margin: ${(props)=> props.margin || '4px 4px 4px 0px'};
  padding: ${(props)=> props.padding || 'default'};
  height: ${(props)=> props.height || 'default' };
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.5s, color 0.5s;
  &:hover {
    background-color: #888;
    color: #fff;
  }
`;
