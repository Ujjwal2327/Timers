import React, { useEffect, useState } from 'react'
import {ImLoop} from 'react-icons/im'
import './Clock.css'


const Clock = () => {
  
  const [date, setTime] = useState(new Date());
  const [digital, setDigital] = useState(false);
  const [hourAngle, setHourAngle] = useState(0);
  const [minAngle, setMinAngle] = useState(0);
  const [secAngle, setSecAngle] = useState(0);
  
  const hourHandStyle = {
    transform: `rotateZ(${hourAngle}deg)`,
    background: 'linear-gradient(white 50%, rgb(17,24,39) 50%)'
  }
  
  const minHandStyle = {
    transform: `rotateZ(${minAngle}deg)`,
    background: 'linear-gradient(white 50%, transparent 50%)'
  }
  
  const secHandStyle = {
    transform: `rotateZ(${secAngle}deg)`,
    background: 'linear-gradient(white 50%, transparent 50%)'
  }
  


  useEffect(()=>{
    setTimeout(() => {
    const temp = new Date();
    setTime(temp)
    setHourAngle(temp.getHours()*30)
    setMinAngle(temp.getMinutes()*6)
    setSecAngle(temp.getSeconds()*6)
    console.log(temp.toLocaleTimeString());
    },1000);
  }, [date])

  const modeHandler = () => {
    setDigital(!digital);
  }

  

  return digital ?
    (
      <div className='py-20 min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 to-pink-200'>
        <div className='font-Sofia flex flex-col items-center gap-10'>
          <p className='text-[20vw] font-semibold text-transparent text-8xl bg-clip-text bg-gradient-to-l from-purple-700 to-pink-700  transition-all duration-300'>
            {date.toLocaleTimeString()}
          </p>
          <button onClick={modeHandler} className='border-none text-xl animate-bounce bg-slate-700 p-2 text-white rounded-md'>
            <ImLoop/>
          </button>
        </div>
      </div>
    )
    :
    (
      <div className=' bg-gray-900 min-h-screen flex items-center justify-center'>
        <div className='h-screen w-full bg-no-repeat bg-center relative flex flex-col items-center justify-center'>

          <div className=' clock clock-shadow h-[400px] w-[400px] rounded-full'>
            
            <div className='w-[20px] h-[20px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-5 rounded-full z-40 '>
            </div>

            <div className={ `h-[150px] w-[7px] absolute top-[36.5vh] left-[49.75vw]`}
                  style={hourHandStyle}>
            </div>

            <div className={ `h-[220px] w-[5px] absolute top-[30.3%] left-[49.69%]`}
                  style={minHandStyle}>
            </div>

            <div className={ `h-[300px] w-[3px] absolute top-[24%] left-[49.9%]`}
                  style={secHandStyle}>
            </div>
          </div>

          <button onClick={modeHandler} className=' bg-slate-200 p-2 rounded-md relative top-10 border-none animate-bounce'>
            <ImLoop/>
          </button>

        </div>
      </div>
    )
      
  }

export default Clock