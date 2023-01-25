import React from 'react'
import { useSelector} from 'react-redux'
import {RiDashboardFill} from 'react-icons/ri'
import {AiOutlineStock} from 'react-icons/ai'
import {TbDeviceDesktopAnalytics} from 'react-icons/tb'
import {IoMdList} from 'react-icons/io'
import NavOption from './NavOption';

const Navbar = ({user, ...props}) => {

    const portfolio = useSelector((state) => state.portfolio);
    const days = useSelector((state) => state.dayCounter);

  return (
    <div className='flex flex-col bg-deep-700 h-full items-center justify-between'>
      <div className='flex flex-col h-[50%] w-[90%] bg-deep-700 items-end justify-start mt-[75px] gap-8'>
        <NavOption link="/dashboard" name="Dashboard" icon={<RiDashboardFill className='icon w-8 h-8 text-deep-100 '/>}/>
        <NavOption link="/trade" name="Trade" icon={<AiOutlineStock className='icon w-8 h-8 text-deep-100 '/>}/>
        <NavOption link="/positions" name="Positions" icon={<IoMdList className='icon w-8 h-8 text-deep-100 '/>}/>
        <NavOption link="/analytics" name="Analytics" icon={<TbDeviceDesktopAnalytics className='icon w-8 h-8 text-deep-100 '/>}/>
         
        
      </div>
    </div>
  )
}

export default Navbar
