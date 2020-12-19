import React from 'react';
import './Select.css';
const Select = (props) =>{
   const handleChange = (event)=>{
      const {handleChange} = props;
      if(handleChange){
         if(handleChange.isIndex) handleChange.callBack(event.target.selectedIndex);
         // select can pass a lot of other things like value, style etc. 
         // This is way we can set the handleChange to handle with all of it.
      }
   }
   const {options, selectAttributes=null} = props;
   return (
            <select onChange={handleChange} {...selectAttributes}>
               {options.map((option,index)=>{
                  return <option data-index={index} key={option}>{option}</option>
               })}
            </select>
          )
}
export default Select;

