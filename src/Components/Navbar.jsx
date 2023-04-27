import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='fixed top-0 bg-slate-800 text-white w-full h-[40px] flex items-center justify-center z-50 '>
        <nav>
            <div className=' flex items-center justify-center gap-10'>
                <NavLink to='/'>Clock</NavLink>
                <NavLink to='/timer'>Timer</NavLink>
                <NavLink to='/pomodoro'>Pomodoro</NavLink>
                <NavLink to='/stopwatch'>Stopwatch</NavLink>
            </div>
        </nav>
    </div>
  )
}

export default Navbar