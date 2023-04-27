import React, { useEffect, useState } from 'react'

const Pomodoro = () => {
  
  const [formData, setFormData] = useState({
    work : 0.05,
    break : 0.05,
    longBreak : 0.05
  })
  const [startPomodoro, setStartPomodoro] = useState(false);
  const [incompleteWorkTimeAngle, setIncompleteWorkTimeAngle] = useState(360);
  const [incompleteBreakTimeAngle, setIncompleteBreakTimeAngle] = useState(360);
  const [incompleteLongBreakTimeAngle, setIncompleteLongBreakTimeAngle] = useState(360);
  
  const styles = {
    workCircle : {
        background: `conic-gradient(red ${incompleteWorkTimeAngle/360*100}%, orange 0)`
    },
    breakCircle : {
        background: `conic-gradient(red ${incompleteBreakTimeAngle/360*100}%, orange 0)`
    },
    longBreakCircle : {
        background: `conic-gradient(red ${incompleteLongBreakTimeAngle/360*100}%, orange 0)`
      },
    completeCycleCircle : {
      background: `orange`
    }
  }

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name] : event.target.value
    }))
  }
  console.log(formData);

  const submitHandler = (event) => {
    event.preventDefault();
    if(!(formData.work || formData.break || formData.longBreak))
      return;
    console.log('data', formData);
    setStartPomodoro(true);
    updateWorkTime();
  }

  const updateWorkTime = () => {
    console.log('update function', incompleteWorkTimeAngle)
    if(incompleteWorkTimeAngle>0){
      console.log('work', incompleteWorkTimeAngle - (360/formData.work/60))
      setIncompleteWorkTimeAngle(incompleteWorkTimeAngle - (360/formData.work/60))
    }
    else if(incompleteBreakTimeAngle>0){
      console.log('break', incompleteBreakTimeAngle - (360/formData.work/60))
      setIncompleteBreakTimeAngle(incompleteBreakTimeAngle - (360/formData.work/60))
    }
    else if(incompleteLongBreakTimeAngle>0){
      console.log('longBreak', incompleteLongBreakTimeAngle - (360/formData.work/60))
      setIncompleteLongBreakTimeAngle(incompleteLongBreakTimeAngle - (360/formData.work/60))
    }
    else{
      console.log('ho gya bhai')
    }
    
  }

  useEffect(()=>{
    if(startPomodoro){
      setTimeout(()=>{
        updateWorkTime();
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incompleteWorkTimeAngle, incompleteBreakTimeAngle, incompleteLongBreakTimeAngle])

  const resetHandler = () => {
    setFormData({
      work : 0.05,
      break : 0.05,
      longBreak : 0.05
    })
    setStartPomodoro(false);
    setIncompleteWorkTimeAngle(360);
    setIncompleteBreakTimeAngle(360);
    setIncompleteLongBreakTimeAngle(360);
  }

  return (
    <div className='pt-20'>
      {
        startPomodoro ?
        (
          <div>
            {/* pomodoro circle */}
            <div className='w-[20vw] aspect-square rounded-full'
              style = {incompleteWorkTimeAngle>0 ? styles.workCircle : (incompleteBreakTimeAngle>0 ? styles.breakCircle : (incompleteLongBreakTimeAngle>0 ? styles.longBreakCircle : styles.completeCycleCircle)) }>
            </div>

            <button onClick={resetHandler}>
              Reset
            </button>
          </div>
        )
        :
        (
          <div>
            <form className='' onSubmit={submitHandler}>
              <div className='flex'>
                <label>
                  <input type='number' name='work' value={formData.work}
                    onChange={changeHandler}/>
                  <p className='text-center'>Pomodoro</p>
                </label>
                <label>
                  <input type='number' name='break' value={formData.break}
                    onChange={changeHandler}/>
                  <p className='text-center'>Break</p>
                </label>
                <label>
                  <input type='number' name='longBreak' value={formData.longBreak}
                    onChange={changeHandler}/>
                  <p className='text-center'>Long Break</p>
                </label>
              </div>

              <button>
                Submit
              </button>

            </form>
          </div>
        )
      }
    </div>
  )
}

export default Pomodoro