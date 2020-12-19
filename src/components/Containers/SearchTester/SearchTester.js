import './SearchTester.css';
import React from 'react';
import Title from '../../Presentational/Title/Title';
import Button from '../../Presentational/Button/Button';
import Input from '../../Presentational/Input/Input';
import Form from '../../Presentational/Form/Form';

class  SearchTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInput : '', error: '', disabled : true};
 }
 updateInput = (value)=> this.setState({userInput :value, error : '', disabled : value.length === 0});
 fetchTesterData = () =>{
   if(this.state.userInput.length < 2){
     this.setState({error : "The input must be bigger then two"});
     return;
   }
   if(this.state.userInput.length > 12){
    this.setState({error : "The input must be smaller than twelve"});
    return;
   }
   (this.props.showTable && this.props.showTable(this.state.userInput))
 }
  render(){
    return (
      <div className="container">
          <div className="modal-small second-bg">
              <Title className={"title-bg primary-bg"}>Search Bugs</Title>
              <Form className="form-modal">
                <Input 
                  isSpecialCharactersAllowed={false}
                  updateInput={this.updateInput}
                  fetchTesterData={this.fetchTesterData}
                  error ={this.state.error}
                  label={{children : "Tester Name", className:"label", htmlFor:"tester"}}
                  input={{className:"input", type:"text" ,name:"tester", placeholder:"Enter the tester name"}}
                  >
                </Input>
              </Form>
              <Button onClick={this.fetchTesterData} className={"button primary-bg"} disabled={this.state.disabled}>Fetch</Button>
          </div>
      </div>
    );
  }
}

export default SearchTester;
