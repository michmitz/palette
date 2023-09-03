"use client"
import React from 'react'

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
        <>{JSON.stringify(color)}</>
      )
    })}</>
  )
}
