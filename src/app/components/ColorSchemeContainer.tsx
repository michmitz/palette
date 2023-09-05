"use client"
import React from 'react'
import { styled } from 'styled-components'

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

const getData = async () => {
  const res = await fetch('https://www.thecolorapi.com/scheme?hex=24B1E0&count=10')
 
  if (res.status !== 200) {
    throw new Error('Failed to fetch colors')
  }
  const data = res.json()
 
  return data
}

export const ColorSchemeContainer: React.FC = async () => {
  const data = await getData()
  console.log("DATA IN HOME", data.colors)

  return (
    <>
    {data.colors.map((color: any, i: number) => {
      return (
        <div key={i}>
        <ColorButton $hexColor={color.hex.value} >{color.name.value}</ColorButton>
        </div>
      )
    })}</>
  )
}
