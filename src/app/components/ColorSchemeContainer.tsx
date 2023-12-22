"use client";
import React from "react";
import { ColorPicker } from "./ColorPicker";
import { ColorScheme } from "./ColorScheme";
import styled from "styled-components";
import { Dropdown } from "./Dropdown";

export type ColorFormat = "hex" | "rgb" | "hsl";
export type SelectedAPI = "chroma" | "colors-api";
export const schemeTypes = [
  "monochrome",
  "analogic",
  "analogic-complement",
  "monochrome-light",
  "complement",
  "triad",
  "quad",
] as const;
export type SchemeType = (typeof schemeTypes)[number];

export const ColorSchemeContainer: React.FC = () => {
  const [colorInput, setColorInput] = React.useState<string>("");
  const [colorData, setColorData] = React.useState<any>(null);
  const [gradientData, setGradientData] = React.useState<any>([]);
  const [format, setFormat] = React.useState<ColorFormat>("rgb");
  const [apiType, setAPIType] = React.useState<SelectedAPI>("chroma");
  const [dropdownValue, setDropdownValue] = React.useState<SchemeType | null>(
    null
  );

  const getData = async (
    hexColor: string,
    count: number,
    mode: string,
    setData: (v: any) => void
  ) => {
    const res = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${hexColor}&count=${count}&mode=${mode}`
    );

    if (res.status !== 200) {
      throw new Error("Failed to fetch colors");
    }
    const data = await res.json();

    setData(data);
  };

  React.useEffect(() => {
    if (colorInput) {
      setColorData(null);
      getData(
        colorInput.substring(1),
        10,
        dropdownValue || "analogic-complement",
        (v) => setColorData(v)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorInput]);

  React.useEffect(() => {
    if (dropdownValue && colorInput) {
      getData(colorInput.substring(1), 10, dropdownValue, (v) =>
        setColorData(v)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownValue]);

  React.useEffect(() => {
    if (colorData !== null) {
      colorData.colors.forEach((color: any) => {
        getData(color.hex.clean, 4, "analogic", (v) =>
          setGradientData((prevData: any) => [
            ...prevData,
            { baseColor: color, color2: v.colors[1], color3: v.colors[3] },
          ])
        );
      });
    }
  }, [colorData]);

  const handleSetColorInput = (v: string) => {
    setGradientData([]);
    setColorInput(v);
  };

  const handleSetFormat = (v: ColorFormat) => {
    setFormat(v);
  };

  const handleSetAPIType = (v: SelectedAPI) => {
    setAPIType(v);
  };

  const handleSetDropdownValue = (v: SchemeType) => {
    setColorData(null);
    setGradientData([]);
    setDropdownValue(v);
  };

  const FormatButton = styled.button<{ $selected: boolean }>`
    color: ${(props) => (props.$selected ? "purple" : "black")};
    margin: 3px;
  `;

  return (
    <div>
      <div className="flex bg-white rounded-2xl shadow-2xl mb-10">
        <p className="font-comfortaa text-xl font-bold">CHOOSE A COLOR</p>
        <ColorPicker onChange={handleSetColorInput} colorInput={colorInput} />
        {/* <ColorPicker onChange={handleSetChromaColorInput} colorInput={chromaColorInput} /> */}

        <div>
          <Dropdown
            value={dropdownValue || "analogic"}
            dropdownValues={schemeTypes}
            onChange={handleSetDropdownValue}
          />

          <div>
            Color Format:
            <FormatButton
              onClick={() => handleSetFormat("hex")}
              className="cursor-pointer font-bold"
              $selected={format === "hex"}
            >
              HEX
            </FormatButton>{" "}
            <FormatButton
              onClick={() => handleSetFormat("rgb")}
              className="cursor-pointer font-bold"
              $selected={format === "rgb"}
            >
              RGB
            </FormatButton>
            <FormatButton
              onClick={() => handleSetFormat("hsl")}
              className="cursor-pointer font-bold"
              $selected={format === "hsl"}
            >
              HSL
            </FormatButton>
          </div>

          <div className="">
            API Type:
            <FormatButton
              onClick={() => handleSetAPIType("chroma")}
              className="cursor-pointer font-bold"
              $selected={apiType === "chroma"}
            >
              Chroma.js (recommended)
            </FormatButton>
            <FormatButton
              onClick={() => handleSetAPIType("colors-api")}
              className="cursor-pointer font-bold"
              $selected={apiType === "colors-api"}
            >
              Colors API
            </FormatButton>
          </div>
        </div>
      </div>

      {gradientData.length ? (
        <ColorScheme colors={gradientData} format={format} />
      ) : colorInput ? (
        <>Loading</>
      ) : (
        <></>
      )}
    </div>
  );
};
