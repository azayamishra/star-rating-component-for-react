import './styles/app.scss'

import RatingStar from 'components/rating-star'

const App = () => {
  return (
    <div className='app-container'>
      <div>
        <div>Rating without Edit Option</div>
        <div>
          <RatingStar
            size={30}
            count={5}
            value={1.5}
            hasHalfStar
            activeColor='green'
          />
        </div>
      </div>
      <div>
        <div>Rating with Edit Option</div>
        <div>
          <RatingStar
            size={15}
            count={10}
            value={3.5}
            hasHalfStar
            isEditable
            activeColor='purple'
            onChange= {(newValue:number) => {
              console.log(`Example 2: new value is ${newValue}`);
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App