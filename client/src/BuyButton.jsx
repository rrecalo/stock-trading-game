import React from 'react'
import {useSelector} from 'react-redux'

const BuyButton = ({buyStock,...props}) => {

    const activeSelection = useSelector((state) => state.tradeSelection);  
    const simulation = useSelector((state) => state.simulating.state);

    function buy(){
        console.log(activeSelection);
        buyStock(activeSelection);
      }

  return (
    <button 
    onClick={buy} className='text-lg text-white w-40 p-2 py-3 px-4 bg-zinc-900 rounded-md'>Buy {activeSelection}</button>
  )
}

export default BuyButton