"use client";
import React from "react";
import { ColorPicker } from "./ColorPicker";
import { ColorScheme } from "./ColorScheme";

export const ColorSchemeContainer: React.FC = () => {
  const [colorInput, setColorInput] = React.useState<string>("");
  const [colorData, setColorData] = React.useState<any>(null);
  const [gradientData, setGradientData] = React.useState<any>([]);

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
      getData(colorInput.substring(1), 5, "analogic-complement", (v) =>
        setColorData(v)
      );
    }
    console.log("color input", colorInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorInput]);

  React.useEffect(() => {
    if (colorData !== null) {
      colorData.colors.forEach((color: any) => {
        getData(color.hex.clean, 4, "triad", (v) =>
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

  return (
    <>
      <p className="font-comfortaa text-2xl">Choose a color</p>
      <ColorPicker onChange={handleSetColorInput} colorInput={colorInput} />
      {gradientData.length ? <ColorScheme colors={gradientData} /> : colorInput ? <>Loading</> : <></>}
    </>
  );
};
