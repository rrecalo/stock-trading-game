import React from 'react'
import {Link} from 'react-router-dom'

const NavOption = ({link, name, icon, ...props}) => {
  return (
    <Link to={`${link}`} className='flex flex-row h-[12%] items-center gap-4 w-[90%] border-deep-300 border-r'>
          {icon}<div className='text-deep-50 text-xl font-light'>{name}</div>
    </Link>
  )
}

export default NavOption