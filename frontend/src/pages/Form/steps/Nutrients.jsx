import React from 'react'

const Nutrients = () => {
  return (
    <div className="flex flex-col">
  <div className="w-full mx-2 flex-1">
    <label className="font-bold mt-3 text-gray-500 text-md leading-8 uppercase">
      Select the macronutrients and micronutrients to include in your meal planning.
    </label>
    
    {/* Wrap MACRONUTRIENTS in a div to ensure it's on a new line */}
    <div className="font-bold h-4 mt-2 text-gray-500 text-xs leading-8 uppercase">
      MACRONUTRIENTS
    </div>
    
    
    {/* Here you can add inputs or options for macronutrients */}
    
  </div>
</div>

  
  )
}

export default Nutrients
