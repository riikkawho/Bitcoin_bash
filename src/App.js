import React, { useState } from "react"
import './App.css'
import { listRange } from './services/data_service'
import { DatesForm } from './components/DatesForm'
import { DatesToShow } from "./components/DatesToShow"
import { RenderContent } from "./components/RenderContent"

const App = () => {

  const [range, setRange] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [dateFrom, setDateFrom] = useState()
  const [dateTo, setDateTo] = useState()

  const onSubmit = (event) => {  
    event.preventDefault()
    const getData = async () => {
      setSubmitted(true)
      setLoading(true)
      const data =  await listRange(dateFrom, dateTo)    
      setRange(data)
      setLoading(false)
    } 
    getData()
  }

  const onChangeFrom = (event) => {
    setRange([])
    setSubmitted(false)
    const dateToSec = new Date(event.target.value).getTime()/1000 
    setDateFrom(dateToSec)
  }

  const onChangeTo = (event) => {
    setSubmitted(false)
    setRange([])
    const dateToSec = new Date(event.target.value).getTime()/1000 + 3600
    setDateTo(dateToSec) 
  }

  return ( 
    <div className='main'>
        <DatesForm 
          dateFrom={dateFrom}
          onSubmit={onSubmit} 
          onChangeFrom={onChangeFrom} 
          onChangeTo={onChangeTo}/>
      <br/>
        <RenderContent 
          range={range}
          dateFrom={dateFrom}
          dateTo={dateTo}
          submitted={submitted}
          loading={loading} />
      <br/>
        <DatesToShow range={range}/>      
    </div>
  )  
}

export default App
