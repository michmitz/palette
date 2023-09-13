"use client";
import React from "react";
import { styled } from "styled-components";

interface ColorSchemeProps {
  readonly colors?: any;
}

const ColorButton = styled.button<{ $rgbColor: any }>`
  border-radius: 15px;
  display: inline-block;
  margin: 0.5rem 1rem;
  padding: 1rem 0;
  transition: all 200ms ease-in-out;
  width: 12rem;
  color: white;
  font-family: Comfortaa;
  background: linear-gradient(
    90deg,
    ${(props) => props.$rgbColor} 0%,
    ${(props) => props.$rgbColor} 35%,
    ${(props) => props.$rgbColor} 100%
  );
`;

export const ColorScheme: React.FC<ColorSchemeProps> = ({ colors }) => {
  console.log("Colors in color scheme", colors);
  return (
    <>
      {colors ? (
        colors.map((color: any, i: number) => {
          return (
            <div key={i}>
              <ColorButton $rgbColor={color.rgb.value}>
                {color.name.value}
              </ColorButton>
            </div>
          );
        })
      ) : (
        <>Loading</>
      )}
    </>
  );
};

