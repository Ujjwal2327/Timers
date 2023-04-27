import React, { useState, useEffect } from 'react'
import {BsPlayCircle} from 'react-icons/bs'
import {AiOutlinePauseCircle, AiFillFlag} from 'react-icons/ai'

const Timer = () => {

  const [timerStart, setTimerStart] = useState(false);
  const [formData, setFormData] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0
  })
  const [timerOver, setTimerOver] = useState(false);
  const [play, setPlay] = useState(false);
  const [timeArray, setTimeArray] = useState([]);
  const [largestIncluded, setLargestIncluded] = useState('secs');

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name] : (event.target.value===null ? 0 : event.target.value)
    }))
  }

  const decimalHandler = (event) => {
    // const inputStr = event.target.value+'';
    // console.log('str', (inputStr).slice(-1))
    // if(((inputStr).slice(-1)==='.')){
    //   setFormData((prev) => ({
    //     ...prev,
    //     [event.target.name] : parseInt(inputStr.split('').splice(0,-1).join(''))
    //   }))
    //   console.log('number is ', parseInt(inputStr.split('').splice(0,-1).join('')))
    // }

      // event.target.value = parseInt(inputStr.split('').splice(0,-1).join(''))
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if(!(formData.days || formData.hours || formData.mins || formData.secs))
      return;
    setTimerStart(true);
    setPlay(true);
    if(formData.days){
      setLargestIncluded('days') 
    }
    else if(formData.hours){
      setLargestIncluded('hours') 
    }
    else if(formData.mins){
      setLargestIncluded('mins') 
    }
    else {
      setLargestIncluded('secs') 
    }

    console.log(formData);
    updateTime(formData);
  }

  const updateSecs = () => {
    setFormData((prev) => ({
      ...prev,
      secs : formData.secs -1
    }))
  }

  const updateMins = () => {
    setFormData((prev) => ({
      ...prev,
      mins : formData.mins -1,
      secs : 59
    }))
  }

  const updateHours = () => {
    setFormData((prev) => ({
      ...prev,
      hours : formData.hours -1,
      mins : 59,
      secs : 59
    }))
  }

  const updateDays = () => {
    setFormData((prev) => ({
      ...prev,
      days : formData.days -1,
      hours : 23,
      mins : 59,
      secs : 59
    }))
  }

  const resetTime = () => {
    setFormData(() => ({
      days : 0,
      hours : 0,
      mins : 0,
      secs : 0
    }))
    setTimerOver(true);
  }

  const updateTime = () => {
    if(formData.secs>1){
      setTimeout(()=>{
        updateSecs();
      }, 1000)
    }
    else if(formData.mins>0){
      setTimeout(()=>{
        updateMins();
      }, 1000)
    }
    else if(formData.hours>0){
      setTimeout(()=>{
        updateHours();
      }, 1000)
    }
    else if(formData.days>0){
      setTimeout(()=>{
        updateDays();
      }, 1000)
    }
    else{
      setTimeout(()=>{
        resetTime();
      }, 1000)
    }
  }

  useEffect(()=>{
    if(timerStart && !timerOver && play)
      updateTime();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  const resetHandler = () => {
    resetTime();
    setTimerOver(false);
    setTimerStart(false);
    setTimeArray([])
    setPlay(false);
  }

  const playPauseHandler = () => {
    if(!play){
      setTimerStart(true);
      setPlay(true);
      // console.log(formData);
      updateTime(formData);
    }
    setPlay(!play);
  }

  const storeHandler = () => {
    let str = '';
    switch (largestIncluded) {
      case 'days':
        str += (formData.days + ' : ')
        /* falls through */
      case 'hours':
        str += (formData.hours + ' : ')
        /* falls through */
      case 'mins':
        str += (formData.mins + ' : ')
        /* falls through */
      default:
        str += (formData.secs)
    }
    if(timeArray.length>0 && timeArray[0]!==str){
      console.log(timeArray[0], '  ', str);
      timeArray.unshift(str);
    }
    else if(timeArray.length===0)
      timeArray.unshift(str);
  }

  const inputScrollHandler = (event) => {
    event.target.blur();
  }

  return (
    <div className='px-10 flex justify-center items-center h-screen w-full max-w-[777px] mx-auto font-Sofia'>
      {
        timerStart ?
        (
          <div className='flex flex-col sm:flex-row  sm:justify-between sm:gap-10 h-screen w-screen py-10'>
            <div className='sm:w-[60vw]'>
              <div className='flex justify-center text-[20vw] leading-tight font-semibold  '>
                <p>
                  {formData.days>0 && 
                    (
                      <div className='flex gap-1'>
                        <span>
                          {formData.days}
                        </span>
                        <span className='mr-1'>:</span>
                      </div>
                    )
                    }
                </p>
                <p>
                  {(formData.days>0 || formData.hours>0) && 
                    (
                      <div className='flex gap-1'>
                        <span>
                          {formData.hours}
                        </span>
                        <span className='mr-1'>:</span>
                      </div>
                    )
                    }
                </p>
                <p>
                  {(formData.days>0 || formData.hours>0 || formData.mins>0) && 
                    (
                      <div className='flex gap-1'>
                        <span>
                          {formData.mins}
                        </span>
                        <span className='mr-1'>:</span>
                      </div>
                    )
                    }
                </p>
                <p>
                  {(formData.days>0 || formData.hours>0 || formData.mins>0 || formData.secs>0) && formData.secs}
                </p>
              </div>

              <div className='flex flex-col items-center'>
                <div className='flex w-full justify-between px-[5vw]'>
                  <button onClick={playPauseHandler}
                    className='text-[2vw]'
                  >
                    {
                      !timerOver && play &&
                      <AiOutlinePauseCircle/>
                    }
                    
                    {
                      !timerOver && !play &&
                      <BsPlayCircle/>
                    }
                  </button>

                  <button onClick={storeHandler}
                    className='text-[2vw]'
                  >
                    <AiFillFlag/>
                  </button>
                </div>

                <button onClick={resetHandler}
                  className='bg-blue-700 hover:bg-blue-400 transition-all w-full max-w-[200px] rounded-xl font-bold text-[4vw]'
                >
                  Reset
                </button>
              </div>
            </div>

            <div  className='sm:w-[30vw] sm:my-14 text-[3vw] overflow-auto custom-scroll '>
              {
                timeArray.map((timestamp, index)=>(
                  <p key={index} className='text-center'>
                    {timestamp}
                  </p>
                ))
              }
            </div>



          </div> 
        )
        :
        (
          <div className=''>
            <form onSubmit={submitHandler} className='flex justify-center flex-col text-[4vw] w-full items-center gap-5'>
              <div className='grid grid-cols-4 gap-10 '>
                <label>
                  <input type='number' name='days' value={formData.days} onChange={changeHandler} min='0'
                    onKeyDown={decimalHandler} onWheel={inputScrollHandler}
                    className='text-center w-full'
                  />
                  <p className='text-center'>Days</p>
                </label>

                <label>
                  <input type='number' name='hours' value={formData.hours} onChange={changeHandler} min='0' max='22'
                    onKeyDown={decimalHandler} onWheel={inputScrollHandler}
                    className='text-center w-full'
                  />
                  <p className='text-center'>Hours</p>
                </label>

                <label>
                  <input type='number' name='mins' value={formData.mins} onChange={changeHandler} min='0' max='59'
                    onKeyDown={decimalHandler} onWheel={inputScrollHandler}
                    className='text-center w-full'
                  />
                  <p className='text-center'>Minutes</p>
                </label>

                <label>
                  <input type='number' name='secs' value={formData.secs} onChange={changeHandler} min='0' max='59'
                    onKeyDown={decimalHandler} onWheel={inputScrollHandler}
                    className='text-center w-full'
                  />
                  <p className='text-center'>Seconds</p>
                </label>
              </div>
              <button className='bg-blue-700 hover:bg-blue-400 transition-all w-full max-w-[200px] rounded-xl font-bold'>
                Submit
              </button>
            </form>
          </div>
        )
      }
    </div>
  )
}

export default Timer