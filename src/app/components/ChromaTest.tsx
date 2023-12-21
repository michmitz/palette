"use client";
import chroma from "chroma-js";
import React from "react";
import styled from "styled-components";

const ColorButton = styled.button<{
  $color1: any;
  $color2: any;
  $color3: any;
}>`
  border-radius: 15px;
  display: inline-block;
  transition: all 200ms ease-in-out;
  width: 13rem;
  height: 13rem;
  color: white;
  font-family: Comfortaa;
  box-shadow: 2px 2px 1px rgba(31, 38, 135, 0.1);
  cursor: pointer;
  background: linear-gradient(
    70deg,
    ${(props) => props.$color1},
    ${(props) => props.$color2},
    ${(props) => props.$color3}
  );
`;

const initialColors = ["red", "orange", "yellow", "blue", "green", "purple"];

export const ChromaTest = () => {
  return (
    <>
      {initialColors.map((color, i) => {
        const colors = chroma
          .scale([`${chroma(color).hex()}`, "#FF5234"])
          .colors(3);

        console.log("colors", colors);

        return (
          <ColorButton
            key={`${color}-${i}`}
            $color1={chroma(colors[0]).css()}
            $color2={chroma(colors[1]).css()}
            $color3={chroma(colors[2]).css()}
          />
        );
      })}
    </>
  );
};
