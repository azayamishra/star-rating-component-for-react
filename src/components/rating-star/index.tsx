import { useEffect, useState } from 'react'
import useRatingConfig from './hooks/useRatingConfig'
import Star from './star'

import './styles/rating-star.scss'

const RatingStar = (props:any) => {
  const { classNames, count, hasHalfStar, onChange, value } = props

  const [config, setConfig] = useRatingConfig(props)
  const [uniqueId, setUniqueId] = useState('')
  const [currentValue, setCurrentValue] = useState(0)
  const [stars, setStars] = useState<any>([])
  const [halfStarAt, setHalfStarAt] = useState(0)
  const [halfStarHidden, setHalfStarHidden] = useState(false)

  useEffect(() => {
    console.log('here now!!!!')
    if (value > count) setStars(getStars(0))
    else setStars(getStars(value))
    setConfig(props)
    createUniqueId()
    setHalfStarAt(Math.floor(value))
    setHalfStarHidden(hasHalfStar && value % 1 < 0.5)
    // eslint-disable-next-line
  }, [])

  const getHalfStarStyles = (color:string, uniqueId:string) => {
    return `
      .rating-star-${uniqueId}:before {
        position: absolute;
        overflow: hidden;
        display: block;
        z-index: 1;
        top: 0; left: 0;
        width: 50%;
        content: attr(data-forhalf);
        color: ${color}
    }`
  }

  const getStars = (activeCount?:number) => {
    if (typeof activeCount === 'undefined') activeCount = getRate()

    let stars = []
    for (let i = 0; i < config.count; i++) {
      stars.push({
        active: i <= activeCount - 1
      })
    }
    return stars
  }

  const getRate = () => {
    return config.hasHalfStar
      ? Math.floor(currentValue)
      : Math.round(currentValue)
  }

  const createUniqueId = () => {
    setUniqueId((Math.random() + '').replace('.', ''))
  }

  const updateStars = (index:number) => {
    const currentActive = stars.filter((x:any) => x.active)
    if (index !== currentActive.length) setStars(getStars(index))
  }

  const moreThanHalf = (event:any) => {
    const { target } = event
    const boundingClientRect = target.getBoundingClientRect()
    let mouseAt = event.clientX - boundingClientRect.left
    mouseAt = Math.round(Math.abs(mouseAt))

    return mouseAt > boundingClientRect.width / 2
  }

  const mouseOver = (event:any) => {
    if (!config.isEditable) return

    let index = Number(event.currentTarget.getAttribute('data-index'))

    if (config.hasHalfStar) {
      const isAtHalf = moreThanHalf(event)
      setHalfStarHidden(isAtHalf)
      if (isAtHalf) index += 1
      setHalfStarAt(index)
    } else index += 1

    updateStars(index)
  }

  const updateHalfStarValues = (value:number) => {
    if (config.hasHalfStar) {
      setHalfStarHidden(value % 1 === 0)
      setHalfStarAt(Math.floor(value))
    }
  }

  const currentValueUpdated = (value:number) => {
    if (value !== currentValue) {
      setStars(getStars(value))
      setCurrentValue(value)
      onChange(value)
    }
  }


  const onClick = (event:any) => {
    if (!config.isEditable) return

    let index = Number(event.currentTarget.getAttribute('data-index'))
    let value
    if (config.hasHalfStar) {
      const isAtHalf = moreThanHalf(event)
      setHalfStarHidden(isAtHalf)
      if (isAtHalf) index += 1
      value = isAtHalf ? index : index + 0.5
      setHalfStarAt(index)
    } else value = index = index + 1

    currentValueUpdated(value)
  }

  function mouseLeave() {
    if (!config.isEditable) return
    updateHalfStarValues(currentValue)
    setStars(getStars())
  }

  const renderHalfStarWithStyles = () => {
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: getHalfStarStyles(props.activeColor, uniqueId)
        }}
      ></style>
    )
  }

  const renderStars = () => {
    return stars.map((star:any, i:number) => (
      <Star
        key={i}
        index={i}
        active={star.active}
        config={config}
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
        onClick={onClick}
        halfStarHidden={halfStarHidden}
        halfStarAt={halfStarAt}
        uniqueId={uniqueId}
      />
    ))
  }

  return (
    <div className='rating-stars-container'>
      <div className={`${classNames} react-stars rating-stars-wrapper`}>
        {config.hasHalfStar && renderHalfStarWithStyles()}
        {renderStars()}
      </div>
    </div>
  )
}

RatingStar.defaultProps = {
  classNames: '',
  isEditable: false,
  value: 0,
  count: 5,
  char: '★',
  hasHalfStar: true,
  size: 15,
  color: 'gray',
  activeColor: '#ffd700',
  onChange: () => {}
}

export default RatingStar