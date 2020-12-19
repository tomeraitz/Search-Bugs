import './TestersList.css';
import React from 'react';
import Title from '../../Presentational/Title/Title';
import Button from '../../Presentational/Button/Button';
import Table from '../../Presentational/Table/Table';
import Select from '../../Presentational/Select/Select';

class  TestersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { testers : [], error: false, sortArray : []};
  }

  componentDidMount(){
    const {data, error} = this.props.serverResponse
    if(error) this.setState({ testers : [], error: true, sortArray : []})
    else{
      let testerArray= null
      let testerSortArr = null
      if(Array.isArray(data)){
          testerArray =[...data.map(tester=>tester=this.changeToArray(tester))];
          testerSortArr = this.sortArray(0, testerArray)
      }
      else{
        testerArray = [this.changeToArray(data)];
        testerSortArr = testerArray;
      }
      this.setState({testers : testerArray, error: false, sortArray :testerSortArr})
    } 
  }

  changeToArray = (testerObj={}) =>{
    const arr = [];
    if(testerObj["firstName"]) arr.push(testerObj["firstName"]);
    if(testerObj["lastName"]) arr.push(testerObj["lastName"]);
    if(testerObj["country"])arr.push(testerObj["country"]);
    if(testerObj["bugs"])arr.push(testerObj["bugs"].map((value,index,array)=>value=index+1 < array.length ? `${value.title}, `: `${value.title}`).join(""));
    return arr;
  }

  sortBySelect = (index) => {
    const {testers} = this.state;
    if(testers.length < 2) return
    this.setState({sortArray : this.sortArray(index)})
  }

  sortArray = (index,testersArray=null) =>{
    const {testers} = this.state;
    const thisTesterArray = testersArray ? testersArray : testers;
    const sortArrayTesters = [...thisTesterArray].sort(function(a,b){ return a[index] > b[index] ? 1 : -1; });
    return sortArrayTesters;
  }
  
  render(){
    const {error, sortArray} = this.state;
    return (
      <div className="container">
       {error ? <span className="tester-error">Temporary error occurred, please try again later</span>: 
        <div className="tester-select">
              <span className="primary-color">Sort By : </span>
              <Select 
                  handleChange={{
                    isIndex : true,
                    callBack : this.sortBySelect
                  }}
                  options={['first name', 'last name', 'country']}
                  selectAttributes={{className:"select-big"}}
              />
          </div>
          }
        <div className="modal-big second-bg">
          <Title className={"title-bg primary-bg"}>Testers List</Title>
          <Table 
            tableTittles={['First Name', 'Last Name', 'Country', 'Bugs']}
            trAttributes={{className:"table-row"}}
            rows={sortArray}
          />
        </div>
        <div className="tester-footer">
            <Button onClick={this.props.goToHome} className={"button button-small primary-bg"} >Go Back</Button>
        </div>

      </div>
    );
  }
}

export default TestersList;
