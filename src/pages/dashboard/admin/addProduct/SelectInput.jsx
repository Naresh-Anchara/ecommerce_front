import React from 'react'

const SelectInput = ({Label,name,value,onChange,options}) => {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>{Label}
      </label>
      <select name={name} value={value} onChange={onChange} 
      className='add-product-InputCSS'
      >
        {
            options.map((option,index)=>(
                <option key={index} value={option.value}>{option.label}</option>
            ))
        }
      </select>
    </div>
  )
}

export default SelectInput
