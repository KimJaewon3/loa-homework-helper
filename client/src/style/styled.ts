import styled from "styled-components";
import { display } from "./display";

const OpenedHeaderMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.titleColor};
  top: 3em;
  padding: 1em 5px 5px 5px;
  z-index: 4;
  width: 120px;
  border: 2px solid ${({ theme }) => theme.color.borderColor};
  border-top: 0;
  border-radius: 5px 5px 10px 10px;
  .opened-list {
    margin: 5px 0 5px 0;
    padding: 0 5px 0 5px;
  }
  .opened-list:not(:last-of-type) {
    border-bottom: 2px solid black;
    padding-bottom: 5px;
  }
  @media ${display.mobile} {
    position: fixed;
    right: 0;
    top: 4.5em;
  }
`;

const ModalBack = styled.div`
  position: fixed;
  background-color: #000000;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
`;

export { OpenedHeaderMenu, ModalBack };
