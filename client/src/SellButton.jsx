import React from 'react'
import { usePrice } from './PriceContext';

const BuyButton = ({sellStock,...props}) => {

    const prices = usePrice();


    function sell(){
        sellStock("SPY");
      }

  return (
    <button onClick={sell} className='text-lg text-white'>Sell Stock!</button>
  )
}

export default BuyButton