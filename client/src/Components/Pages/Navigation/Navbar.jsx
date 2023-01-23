import React from 'react'
import { useSelector} from 'react-redux'
import PortfolioChart from '../../PortfolioChart';

const Navbar = ({user, ...props}) => {

    const portfolio = useSelector((state) => state.portfolio);
    const cash = useSelector((state) => state.capital);
    const days = useSelector((state) => state.dayCounter);

  return (
        <div className='w-full fixed-top flex flex-row bg-zinc-900 h-[100px] items-center justify-between px-[25px] lg:px-[75px]'>
        <div>
        <div className='text-white text-2xl'>
        Welcome, {user}
        </div>
        <div className='text-zinc-500 text-xl'>
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
        <div className='h-[100px] w-[200px]'>
        <PortfolioChart />
        </div>
        </div>
        
    </div>
  )
}

export default Navbar