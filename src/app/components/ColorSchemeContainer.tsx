"use client"
import React from 'react'
import { styled } from 'styled-components'

const Button = styled.button<{ $hexColor: any; }>`
  border-radius: 3px;
  display: inline-block;
  margin: 0.5rem 1rem;
  padding: 0.5rem 0;
  transition: all 200ms ease-in-out;
  width: 200px;
  background-color: ${props => props.$hexColor};
`

const getData = async () => {
  const res = await fetch('https://www.thecolorapi.com/scheme?hex=24B1E0')
 
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
    <>{data.colors.map((color: any) => {
      return (
        <>
        <Button $hexColor={color.hex.value}>asdfasdf</Button>
        </>
      )
    })}</>
  )
}
