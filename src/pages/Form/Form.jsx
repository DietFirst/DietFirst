import React from 'react'
import Stepper from './Stepper';
import StepperControl from './StepperControl';


const Form = () => {
  return (
    <div className='md: w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-cyan-600'>
      {/* Stepper */}

   <div className="container horizontal mt-5 shadow-xl">
   <Stepper />
   </div>

      {/* Navigation Controls */}
   <StepperControl />

    </div>
  )
}

export default Form
