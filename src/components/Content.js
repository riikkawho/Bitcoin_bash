
export const Content = (props) => {
  const range = props.range
  
  const priceCompare = range.map(day => {
    return day.price
  })

  const volumeCompare = range.map(day => {
    return day.volume
  })

  const maxVolume = Math.max(...volumeCompare)
  const volToFind = vol => vol === maxVolume
  const maxVolIndex = volumeCompare.findIndex(volToFind)

  let largestProfit = 0
  let dayToBuy
  let dayToSell

  priceCompare.forEach((price, index) => { 
    let rounds = index
    let arr = priceCompare.slice(index, priceCompare.length)
  
    arr.forEach(() => {
      rounds = rounds + 1
        if (rounds > index && price - priceCompare[rounds] < largestProfit) { 
          largestProfit = price - priceCompare[rounds]
          dayToBuy = range[index].header
          dayToSell = range[rounds].header
        } 
    })
  })

  let trendDownStreak = []
  let trendDownDays = []

  priceCompare.forEach((price, index) => {
    if (priceCompare[index + 1] && price > priceCompare[index + 1]) {
      trendDownDays.push(range[index + 1])
    } else {
      trendDownStreak.push(trendDownDays)
      trendDownDays = []
    } 
  })

  
  if (largestProfit === 0) return <h4>Not a good time to trade, prices dropping the whole time</h4>

  let streakLengths = trendDownStreak.map((arr, index) => arr.length)
  let trendDown = Math.max(...streakLengths)
  let longestIndex = streakLengths.findIndex(length => length === trendDown)



  let text;
  if (trendDown >= 2) text = `The longest bearish trend is ${trendDown} days from ${trendDownStreak[longestIndex][0].header} to ${trendDownStreak[longestIndex][trendDownStreak[longestIndex].length -1].header}`
  if (trendDown < 2) text = 'No significant bearish trend in the range'
  if (trendDown === 0) text = 'Trend only going up in the range'

  return (
    <div>
      <div className='container'>
        <p>Buy: {dayToBuy}
        <br/>Sell: {dayToSell}
        <br/>Profit: {Math.abs(largestProfit.toFixed(2))} €</p>
      </div>
      <h4>{text}</h4>
      <p>The highest trading volume is {maxVolume.toFixed(2)} at {range[maxVolIndex].header} 
      <br/>Total value of the trade is {(range[maxVolIndex].price * range[maxVolIndex].volume).toFixed(2)} €</p>
    </div>
  )
  


}