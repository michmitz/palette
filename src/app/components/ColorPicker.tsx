import React from 'react'

interface ColorPickerProps {
  readonly onChange: (v: string) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
  return (
    <div>
      <input type="color" onChange={e => onChange(e.target.value)} />
    </div>
  )
}
