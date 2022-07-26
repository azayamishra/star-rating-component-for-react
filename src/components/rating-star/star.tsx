import './styles/rating-star.scss'

import { StarProps } from './types'

const Star = (props: StarProps) => {
  const {
    index,
    active,
    config,
    onMouseOver,
    onMouseLeave,
    onClick,
    halfStarHidden,
    halfStarAt,
    uniqueId
  } = props

  const { color, activeColor, size, char, hasHalfStar, isEditable } = config

  let starClass =
    hasHalfStar && !halfStarHidden && halfStarAt === index
      ? `rating-star rating-star-${uniqueId}`
      : 'rating-star'

  const styles = {
    color: active ? activeColor : color,
    cursor: isEditable ? 'pointer' : 'default',
    fontSize: `${size}px`
  }

  return (
    <span
      className={starClass}
      style={styles}
      key={index}
      data-index={index}
      data-forhalf={char}
      onMouseOver={onMouseOver}
      onMouseMove={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {char}
    </span>
  )
}

export default Star

