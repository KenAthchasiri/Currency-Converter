import { useEffect, useState } from 'react'
import './App.css'
import money from './assets/money.png'
import CurrencyComponent from './components/CurrencyComponent'


function App() {
  const [currencyChoice,setCurrencyChoice] = useState([])

  const [fromCurrency,setFromCurrency] = useState('THB')
  const [toCurrency,setToCurrency] = useState('USD')

  const [amount,setAmount] = useState(1)
  const [exchangeRate,setExchangeRate] = useState(0)

  const [checkFromCurrency,setCheckFromCurrency] = useState(true)

  let fromAmount,toAmount 

  if(checkFromCurrency) {
    fromAmount = amount
    toAmount = (amount*exchangeRate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = (amount/exchangeRate).toFixed(2)
  }

  const amountFromCurrency = (e) =>{
    setAmount(e.target.value)
    setCheckFromCurrency(true)
  }
  const amountToCurrency = (e) =>{
    setAmount(e.target.value)
    setCheckFromCurrency(false)
  }

  useEffect(()=>{
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    fetch(url)
      .then(res=>res.json())
      .then(data=>{
        setCurrencyChoice([...Object.keys(data.rates)])
        setExchangeRate(data.rates[toCurrency])}
      )

  },[fromCurrency,toCurrency])
  return (
    <div>
      <img className='money' src={money} alt="money"/>
      <h1>แอพแปลงสกุลเงิน</h1>
      <div className='Container'>
        <CurrencyComponent 
          changeCurrency={(e)=>setFromCurrency(e.target.value)} 
          currencyChoice={currencyChoice} 
          selectCurrency={fromCurrency}
          amount={fromAmount}
          onChangeAmount={amountFromCurrency}
        />
        <div className='equal'> = </div>
        <CurrencyComponent 
          changeCurrency={(e)=>setToCurrency(e.target.value)}  
          currencyChoice={currencyChoice} 
          selectCurrency={toCurrency}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />
      </div>
      
    </div>
  )
}

export default App
