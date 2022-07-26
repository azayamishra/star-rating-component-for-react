export interface ConfigProps {
  activeColor: string
  char: any
  color: string
  count: number
  hasHalfStar: boolean
  isEditable: boolean
  size: number
}

export interface StarProps {
  index: number
  active: boolean
  config: ConfigProps
  onMouseOver: any
  onMouseLeave: any
  onClick: any
  halfStarHidden: boolean
  halfStarAt: number
  uniqueId: string
}

export interface RatingProps {
  config: ConfigProps
}