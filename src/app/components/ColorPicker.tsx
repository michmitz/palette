import React from 'react'
import { styled } from 'styled-components'

interface ColorPickerProps {
  readonly colorInput?: string
  readonly onChange: (v: string) => void
}

const ColorPickerInput = styled.input`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: none;
  cursor: pointer;
  height: 6em;
  padding: 0;
  width: 6em;
  transition: all 200ms ease-in-out;
  border-radius: 50%;

  &::-webkit-color-swatch-wrapper {
    border: 0;
    border-radius: 50%;
  }
  
  &::-webkit-color-swatch{
    border: 0;
    border-radius: 50%;
    box-shadow: 5px 5px 1px rgba(31, 38, 135, 0.1);
  }
  
  &::-moz-color-swatch,
  ::-moz-focus-inner{
    border-radius: 50%;
  }
  
  &::-moz-focus-inner{
    border-radius: 50%;
  }
`;

export const ColorPicker: React.FC<ColorPickerProps> = ({ colorInput, onChange }) => {
  return (
    <div>
      <ColorPickerInput type="color" onChange={e => onChange(e.target.value)} value={`${colorInput || '#FFFFFF'}`} /> 
    </div>
  )
}
