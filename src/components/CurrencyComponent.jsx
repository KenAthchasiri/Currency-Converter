import React from 'react'
import './CurrencyComponent.css'

const CurrencyComponent = (props) => {
    const {currencyChoice,selectCurrency,changeCurrency,amount,onChangeAmount} = props

    return (
        <div className='currency'>
            <select onChange={changeCurrency} value={selectCurrency}>
                {currencyChoice.map((choice)=>{
                    return <option value={choice} key={choice}>{choice}</option>
                })}
            </select>
            <input type="number" value={amount} onChange={onChangeAmount}/>
        </div>
    )
}

export default CurrencyComponent