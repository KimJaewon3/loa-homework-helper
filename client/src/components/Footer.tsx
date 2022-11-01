import React from "react";
import styled from "styled-components";
import { mococoImg } from "../img/mococoImg";

const FooterDiv = styled.footer`
  background-color: white;
  margin-top: 2em;
  overflow: hidden;
  max-width: 100%;
  height: 110px;
  > img {
    width: 100px;
    height: 100px;
    margin-left: 50px;
  }
`;

export default function Footer() {
  return (
    <FooterDiv>
      {mococoImg.map((src, idx) => {
        return <img src={src} key={idx}></img>;
      })}
    </FooterDiv>
  );
}
