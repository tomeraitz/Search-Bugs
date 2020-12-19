import React from 'react';
import './Input.css';

/*
 * Input props list
 * isSpecialCharactersAllowed : boolean(not mandatory) - give the user ability to write special characters.
 * updateInput : function (not mandatory) - If the container wants to update his state input.
 * fetchTesterData : function (mandatory) - find data from server.
 * error : string (not mandatory) - if the container need to add error.
 * label : object (mandatory) - all the label attributes.
 * input : object (mandatory) - all the input attributes.
 */ 

class Input extends React.Component{
   constructor(props) {
      super(props);
      this.state = { value: '' , error: ''};
   }

   checkValue = (e)=>{ // This general input validation for reuse it in different places
      const userValue = e.target.value;
      const {isSpecialCharactersAllowed, updateInput} = this.props; 
      const {type} = this.props.input;
      const checkIfNumber = userValue[userValue.length -1] % 1 === 0;
      if(type === "text" && checkIfNumber && userValue[userValue.length -1] !== ' '){
         this.setState({error : 'Numbers not allowed'})
         return;
      } 
      if(!isSpecialCharactersAllowed && type === "text"){
         const format = /[!@#$%^&*~`()_+\-=[\]{};':"\\|,.<>/?]+/;
         if(format.test(userValue)){
            this.setState({error : 'Special characters not allowed'})
            return;
         }
      }
      (updateInput && updateInput(e.target.value)) // If the container wants to update his state input
      this.setState({value : e.target.value, error : ''});
   }

   render(){
      const { children, ...labelAttributes} = this.props.label
      const { ...InputAttributes} =  this.props.input;
      const {error='', fetchTesterData=null} =  this.props;
      return (
         <>
            <label {...labelAttributes}>{children}</label>
            <input 
               onChange={this.checkValue} 
               value={this.state.value} 
               {...InputAttributes}
               onKeyPress={(event)=>{
                  if(fetchTesterData && event.key === 'Enter'){
                     event.preventDefault();
                     fetchTesterData();
                  }
               }} 
            />
            <span className="input-error">{this.state.error || error}</span>
         </>
       )
   }
}
export default Input;

