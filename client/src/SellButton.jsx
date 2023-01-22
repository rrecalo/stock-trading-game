import React from 'react'

const BuyButton = ({sellStock,...props}) => {



    function sell(){
        sellStock("SPY");
      }

  return (
    <button onClick={sell} className='text-lg text-white p-2 px-4 bg-zinc-900 rounded-md'>Sell Stock!</button>
  )
}

export default BuyButton