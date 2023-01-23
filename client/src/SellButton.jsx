import React from 'react'
import { useSelector } from 'react-redux'

const BuyButton = ({sellStock,...props}) => {

    const activeSelection = useSelector((state) => state.tradeSelection);  
    const positions = useSelector((state) => state.positions);

    function sell(){
        sellStock(activeSelection);
      }

  return (
    <button onClick={sell} className='text-lg text-white w-40 p-2 py-3 px-4 bg-zinc-900 rounded-md'>Sell {activeSelection}</button>
  )
}

export default BuyButton