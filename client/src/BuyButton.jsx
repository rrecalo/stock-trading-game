import React from 'react'

const BuyButton = ({buyStock,...props}) => {



    function buy(){
        buyStock("SPY");
      }

  return (
    <button onClick={buy} className='text-lg text-white p-2 px-4 bg-zinc-900 rounded-md'>Buy Stock!</button>
  )
}

export default BuyButton