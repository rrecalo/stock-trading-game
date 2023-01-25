import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

const NavOption = ({link, name, icon, ...props}) => {

    const location = useLocation();

  return (
    <Link to={`${link}`} className={`flex flex-row h-[12%] items-center gap-4 w-[90%] border-r ${location.pathname === link ? 'border-deep-50 border-r-2': 'border-deep-300'}`}>
          {icon}<div className='text-deep-50 text-xl font-light'>{name}</div>
    </Link>
  )
}

export default NavOption