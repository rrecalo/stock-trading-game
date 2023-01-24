import React from 'react'
import { useSelector } from 'react-redux'

const BuyButton = ({sellStock,...props}) => {

    const activeSelection = useSelector((state) => state.tradeSelection);  

    function sell(){
        sellStock(activeSelection);
      }

  return (
    <button onClick={sell} className='text-lg text-white w-40 p-1 px-4 bg-deep-900 rounded-2xl'>Sell 10 {activeSelection}</button>
  )
}

export default BuyButton