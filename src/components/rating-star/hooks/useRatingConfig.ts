import { useState } from 'react'
import { ConfigProps } from '../types'

const useRatingConfig = (config: any) => {
  const [count, setCount] = useState(config.count)
  const [size, setSize] = useState(config.size)
  const [char, setChar] = useState(config.char)
  const [color, setColor] = useState(config.color)
  const [activeColor, setActiveColor] = useState(config.activeColor)
  const [hasHalfStar, setHasHalfStar] = useState(config.hasHalfStar)
  const [isEditable, setIsEditable] = useState(config.isEditable)

  const configObj = {
    count,
    size,
    char,
    color,
    activeColor,
    hasHalfStar,
    isEditable
  }

  const setConfig = (config: ConfigProps) => {
    setCount(config.count)
    setSize(config.size)
    setChar(config.char)
    setColor(config.color)
    setActiveColor(config.activeColor)
    setHasHalfStar(config.hasHalfStar)
    setIsEditable(config.isEditable)
  }
  return [configObj, setConfig] as const
}

export default useRatingConfig
