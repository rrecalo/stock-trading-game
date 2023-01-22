import React from 'react'
import { useSelector} from 'react-redux'

const Navbar = ({user, ...props}) => {

    const portfolio = useSelector((state) => state.portfolio);
    const cash = useSelector((state) => state.capital);

  return (
        <div className='w-full fixed-top flex flex-row bg-zinc-900 h-[100px] items-center justify-between px-[25px]'>
        <div className='text-white text-2xl'>
        Welcome, {user}
        </div>
        <div className='text-green-500 text-2xl'>
            ${portfolio.toFixed(2)}
        </div>
        <div className='text-green-500 text-2xl'>
            ${cash.toFixed(2)}
        </div>
    </div>
  )
}

export default Navbar