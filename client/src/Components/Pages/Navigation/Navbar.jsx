import React from 'react'
import { useSelector} from 'react-redux'
import PortfolioChart from '../../PortfolioChart';

const Navbar = ({user, ...props}) => {

    const portfolio = useSelector((state) => state.portfolio);
    const days = useSelector((state) => state.dayCounter);

  return (
    <div className='w-[8%] fixed-top flex flex-col bg-zinc-800 h-screen items-center justify-between px-[25px] lg:px-[75px]'>
      <div className='text-white text-2xl'>
      {user}
      </div>
    </div>
  )
}

export default Navbar

/**
 *  <div className='text-zinc-500 text-xl'>
          It has been <span className='text-white'>{days}</span> days
        </div>
        </div>
        <div className='flex flex-row justify-start items-center'>
          <div className='flex flex-col'>
            <div className='text-white text-xl'>
              Net Worth
            </div>
            <div className='text-green-500 text-2xl'>
              ${portfolio.toFixed(2)}
            </div>
          </div>
        <div className='h-[100px]'>
        <PortfolioChart />
        </div>
 * 
 */