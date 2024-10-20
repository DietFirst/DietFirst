import React from 'react'

const StepperControl = () => {
  return (
    <div className='container flex justify-around mt-5 mb-8'>
      { /*  back button */ }
      <button className='bg-white text-cyan-600 uppercase py-2 px-4 rounded xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white'> 
        Back
      </button>
      { /*  next button */ }
      <button className='bg-white text-cyan-600 uppercase py-2 px-4 rounded xl font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white'> 
         Next
      </button>
    </div>
  )
};

export default StepperControl;
