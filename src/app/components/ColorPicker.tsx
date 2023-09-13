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
  box-shadow: 2px 2px 10px gray;
  border-radius: 50%;

  &::-webkit-color-swatch-wrapper {
    border-radius: 50%;
  }
  
  &::-webkit-color-swatch{
    border: 0;
    border-radius: 50%;
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
