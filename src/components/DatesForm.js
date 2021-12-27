import { Button } from './Button'

export const DatesForm = (props) => {

const oneDayInMillisec = 24 * 60 * 60 * 1000
const today = new Date()
const maxDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

//get milliseconds of today and subtract milliseconds of 24 hours
const dayBefore = new Date(today.getTime()-(oneDayInMillisec))
const yesterday = `${dayBefore.getFullYear()}-${dayBefore.getMonth()+1}-${dayBefore.getDate()}`

//get input from 'dateFrom' in seconds, convert to milliseconds and add 24 hours in milliseconds
const from = new Date(props.dateFrom * 1000 + oneDayInMillisec)
let dayFrom = from.getDate().toString() 

//add zero in the beginning to format the date to two digits
if (dayFrom.length === 1) dayFrom = `0${dayFrom}` 
const minFrom = `${today.getFullYear()}-${today.getMonth()+1}-${dayFrom}`

  return (
    <div>
      <div>
      <p className='title'>SELECT RANGE</p>
      <form onSubmit={props.onSubmit}>
        <label>From</label>
        <p><input type='date' id='from' onChange={props.onChangeFrom} min='2013-04-28' max={yesterday}/></p>
        <label>To</label>
        <p><input type='date' id='to' onChange={props.onChangeTo} min={minFrom.toString()} max={maxDate} /></p>
        <Button type='submit' onClick={props.onSubmit} text={'Start search'}/>
      </form>
      </div>
  </div>
  )
} 