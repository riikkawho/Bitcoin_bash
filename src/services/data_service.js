
import axios from 'axios'

export const listRange = async (from, to, cur = 'eur') => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=${cur}&from=${from}&to=${to}`)
  const { data } = response
  const info = {}

    data.market_caps.forEach((cap, index) => {
      info[new Date(cap[0]).toISOString()] = {
        market_cap: data.market_caps[index][1],
        price: data.prices[index][1],
        total_volumes: data.total_volumes[index][1],
      }
    })
    
      const array = Object.keys(info)
      const datesArray = array.map(date => date.substring(0, 10))
      const valueArray = Object.values(info)
      let objectsArray = []
    
           
      datesArray.forEach((d, index) => { 
        if (datesArray[index] !== datesArray[index + 1]) {
        
          const day = date => date === d
          const firstIndex = datesArray.findIndex(day)
        
          objectsArray.push(
            {
              header: datesArray[firstIndex],
              price:  valueArray[firstIndex].price,
              volume: valueArray[firstIndex].total_volumes
            }
          )
        }    
      }) 
      return objectsArray
    }
        