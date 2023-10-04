
import React from "react";
import { styled } from "styled-components";

interface ColorSchemeProps {
  readonly colors?: any;
}

const ColorButton = styled.button<{ $rgbColor: any; $rgbGradient1: any; $rgbGradient2: any }>`
  border-radius: 15px;
  display: inline-block;
  transition: all 200ms ease-in-out;
  width: 14rem;
  height: 8rem;
  color: white;
  border: 2px solid white;
  font-family: Comfortaa;
  box-shadow: 5px 5px 10px rgba(31, 38, 135, 0.37);
  cursor: pointer;
  background: linear-gradient(
    60deg,
    ${(props) => props.$rgbColor},
    ${(props) => props.$rgbGradient1},
    ${(props) => props.$rgbGradient2}
  );
`;

export const ColorScheme: React.FC<ColorSchemeProps> = ({ colors }) => {
  return (
    <>
      {colors ? (
        colors.map((color: any, i: number) => {
          const generateRGBA = (gradientObj: any, opacity: string) => {
            const obj = gradientObj.rgb
            return `rgba(${obj.r}, ${obj.g}, ${obj.b}, ${opacity})`
          }
          const color1 = generateRGBA(color.baseColor, '1')
          const color2 = generateRGBA(color.color2, '1')
          const color3 = generateRGBA(color.color3, '1')

          return (
            <div key={i} className="m-3">
              <ColorButton $rgbColor={color1} $rgbGradient1={color2} $rgbGradient2={color3}></ColorButton>
            </div>
          );
        })
      ) : (
        <>Loading</>
      )}
    </>
  );
};
