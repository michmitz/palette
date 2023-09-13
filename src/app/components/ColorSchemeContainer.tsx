"use client";
import React from "react";
import { ColorPicker } from "./ColorPicker";
import { ColorScheme } from "./ColorScheme";

export const ColorSchemeContainer: React.FC = () => {
  const [colorInput, setColorInput] = React.useState<string>("");
  const [colorData, setColorData] = React.useState<any>([]);

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://www.thecolorapi.com/scheme?hex=${colorInput.substring(1)}&count=10`
      );

      if (res.status !== 200) {
        throw new Error("Failed to fetch colors");
      }
      const data = await res.json();
      //  return data
      setColorData(data);
    };

    if (colorInput) {
      getData();
    }
  }, [colorInput]);

  return (
    <>
      <p className="font-comfortaa">Choose a color</p>
      <ColorPicker onChange={setColorInput} colorInput={colorInput} />
      {colorData.colors ? (
        <ColorScheme colors={colorData.colors} />
      ) : (
        <>Loading</>
      )}
    </>
  );
};
