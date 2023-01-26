import React from 'react'
import { useSelector} from 'react-redux'

const Trade = () => {


  const portfolio = useSelector((state) => state.portfolio);

  return (
    <div className='flex flex-col m-auto w-[95%] h-[95%]'>
        <div className='flex flex-row justify-between w-[100%] text-white text-3xl font-extralight pb-2'>
          <div className='text-white text-3xl font-extralight'>Trade</div>
          <div className='text-green-500 text-3xl font-extralight'>${portfolio.value.toFixed(2)}</div>
        </div>
    </div>
  )
}


export default Trade