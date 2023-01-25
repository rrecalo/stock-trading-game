import React from 'react'
import { useSelector} from 'react-redux'
import PortfolioChart from '../../PortfolioChart';
import {RiDashboardFill} from 'react-icons/ri'
import {AiOutlineStock} from 'react-icons/ai'
import {TbDeviceDesktopAnalytics} from 'react-icons/tb'
import {IoMdList} from 'react-icons/io'

const Navbar = ({user, ...props}) => {

    const portfolio = useSelector((state) => state.portfolio);
    const days = useSelector((state) => state.dayCounter);

  return (
    <div className='flex flex-col bg-deep-700 h-full items-center justify-between'>
      <div className='flex flex-col h-[50%] w-[90%] bg-deep-700 items-end justify-start mt-[75px] gap-8'>
        <div className='flex flex-row h-[12%] items-center gap-4 w-[90%] border-deep-300 border-r'>
          <RiDashboardFill className='icon w-8 h-8 text-deep-100 '/>
          <div className='text-deep-50 text-xl font-light'>Dashboard</div>
        </div>
        <div className='flex flex-row h-[12%] items-center gap-4 w-[90%] border-deep-300 border-r'>
          <AiOutlineStock className='icon w-8 h-8 text-deep-100 '/>
          <div className='text-deep-50 text-xl font-light'>Trade</div>
        </div>
        <div className='flex flex-row h-[12%] items-center gap-4 w-[90%] border-deep-300 border-r'>
          <IoMdList className='icon w-8 h-8 text-deep-100 '/>
          <div className='text-deep-50 text-xl font-light'>Positions</div>
        </div>
        <div className='flex flex-row h-[12%] items-center gap-4 w-[90%] border-deep-300 border-r'>
          <TbDeviceDesktopAnalytics className='icon w-8 h-8 text-deep-100 '/>
          <div className='text-deep-50 text-xl font-light'>Analytics</div>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar

/**a
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