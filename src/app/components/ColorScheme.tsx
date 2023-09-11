"use client"
import React from 'react'
import { styled } from 'styled-components'

interface ColorSchemeProps {
  readonly colors?: any
}

const ColorButton = styled.button<{ $hexColor: any; }>`
  border-radius: 15px;
  display: inline-block;
  margin: 0.5rem 1rem;
  padding: 0.5rem 0;
  transition: all 200ms ease-in-out;
  width: 11rem;
  color: white;
  background-color: ${props => props.$hexColor};
`

export const ColorScheme: React.FC<ColorSchemeProps> = ({ colors }) => {
  console.log("Colors in color scheme", colors)
  return (
    <>
    {colors ? colors.map((color: any, i: number) => {
      return (
        <div key={i}>
        <ColorButton $hexColor={color.hex.value} >{color.name.value}</ColorButton>
        </div>
      )
    }) : <>Loading</>}</>
  )
}
