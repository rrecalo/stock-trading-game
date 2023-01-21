import React from 'react'
import { usePrice } from './PriceContext';

const BuyButton = ({buyStock,...props}) => {

    const prices = usePrice();


    function buy(){
        buyStock("SPY");
      }

  return (
    <button onClick={buy} className='text-lg text-white'>Buy Stock!</button>
  )
}

export default BuyButton