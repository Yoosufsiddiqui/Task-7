// import axios from 'axios';
import { useState, useEffect } from 'react';
import CurrentRates from './components/CurrentRates';
import Conversions from './components/Conversions';
import './App.css'

function App() {
  const [currency,setCurrency] = useState(null)
  const [time , setTime] = useState('')
  const [isCurrentRates, setIsCurrentRates] = useState(false); // To show the current rates component when its button is clicked , and vice versa

  useEffect(()=> {
    const getCurrency = async () => {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      const data = await response.json()
      setCurrency(data.bpi)
      setTime(data.time.updated)
    }

    getCurrency() 
  }, [])

  return (
    <div className="App">
      <header>
        <h2 className='mt-5 font-bold'> Bitcoin Currency Converter</h2>
        <div className='header-buttons'>
          <button onClick={()=> {setIsCurrentRates(true)}} className='m-2' >Fetch Rates</button>
          <button onClick={()=> {setIsCurrentRates(false)}} className='m-2'>Convert To BTC</button>
        </div>
      </header>
      <div className='time-container'>
        <p className='time'>{time}</p>
      </div>

      <div className='main'>
        {isCurrentRates ? <CurrentRates currencyData={currency}/> : <Conversions />}
      </div>


    </div>
  );
}

export default App;
