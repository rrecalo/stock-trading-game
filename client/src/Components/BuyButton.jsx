import React from 'react'
import {useSelector} from 'react-redux'

const BuyButton = ({buyStock,...props}) => {

    const activeSelection = useSelector((state) => state.tradeSelection);  

    function buy(){
        buyStock(activeSelection);
      }

  return (
    <button 
    onClick={buy} className='text-lg text-white w-40 p-3 px-4 bg-deep-900 rounded-2xl'>Buy 10 {activeSelection}</button>
  )
}

export default BuyButton