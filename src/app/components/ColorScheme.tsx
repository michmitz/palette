import React from "react";
import { styled } from "styled-components";
import { ColorFormat } from "./ColorSchemeContainer";

interface ColorSchemeProps {
  readonly colors?: any;
  readonly format: ColorFormat;
}

const ColorButton = styled.button<{
  $rgbColor: any;
  $rgbGradient1: any;
  $rgbGradient2: any;
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
    ${(props) => props.$rgbColor},
    ${(props) => props.$rgbGradient1},
    ${(props) => props.$rgbGradient2}
  );
`;

const SingleColor = styled.div<{ $color: any }>`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  transition: all 200ms ease-in-out;
  box-shadow: 2px 2px 1px rgba(31, 38, 135, 0.1);
  background: ${(props) => props.$color};
  margin: 3px;
`;

const generateColor = (gradientObj: any, opacity: string, format: ColorFormat) => {
  const rgb = gradientObj.rgb;
  if (format === 'rgb') {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`; }

  return gradientObj.hex.value;
};

export const ColorScheme: React.FC<ColorSchemeProps> = ({ colors, format }) => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2">
      {colors ? (
        colors.map((color: any, i: number) => {
          const color1 = generateColor(color.baseColor, "1", format);
          const color2 = generateColor(color.color2, "1", format);
          const color3 = generateColor(color.color3, "1", format);

          return (
            <div key={i} className="m-3 flex flex-col">
              <div className="flex mb-2">
                <SingleColor $color={color1} />
                <SingleColor $color={color2} />
                <SingleColor $color={color3} />
              </div>
              <ColorButton
                $rgbColor={color1}
                $rgbGradient1={color2}
                $rgbGradient2={color3}
              ></ColorButton>
            </div>
          );
        })
      ) : (
        <>Loading</>
      )}
    </div>
  );
};
