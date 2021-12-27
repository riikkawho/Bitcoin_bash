import { useState } from 'react'
import { Button } from './Button'

export const DatesToShow = (props) =>  {
  const [showDates, setShowDates] = useState(false)

  const range = props.range 

  const stats = range.map(d => {    
    return ( 
      <p key={d.header}>
        <b> {d.header}</b>
        <br/> Price of the day: {d.price.toFixed(2)} €
        <br/> Trading volume: {d.volume.toFixed(2)}
        <br/> Value of trade: {(d.volume * d.price).toFixed(2)} €
      </p>
    )          
  })
  
  const onClick = () => setShowDates(!showDates)

  if (range.length === 0 && showDates) setShowDates(false)
  if (range.length === 0) return null  
  if (!showDates) return <Button onClick={onClick} text={'Show daily stats'}/>

  return (
    <div>
      <Button onClick={onClick} text={'Hide daily stats'}/>
      <br/><div className='container-day'>{stats} </div>
    </div>
  )
    
}