import styled from "styled-components";

export const OpenedMenuList = styled.div`
  position: absolute;
  background-color: white;
  top: 1.1em;
  padding: 1em 5px 5px 5px;
  z-index: 4;
  width: 120px;
  border: 2px solid black;
  border-radius: 0 0 10px 10px;
  .opened-list{
    margin: 5px 0 5px 0;
    padding: 0 5px 0 5px; 
  }
  .opened-list:not(:last-of-type) {
    border-bottom: 2px solid black;
    padding-bottom: 5px;
  }
`;
