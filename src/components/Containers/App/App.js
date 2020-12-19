import './App.css';
import React from 'react';
import SearchTester from '../SearchTester/SearchTester';
import { BrowserRouter, Route, Switch , Redirect} from 'react-router-dom';
import TestersList from '../TestersList/TestersList';
import httpRequest from '../../../services/httpRequest.service';

class  App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isTesterList : false, testerName : '', serverResponse : {}};
 }

 setData = (data) =>{
  this.setState({isTesterList : true,serverResponse : data})
 }

 showTable = (testerName) =>{
   if(!this.state.testerName){
    this.setState({testerName : testerName});
    httpRequest(testerName,this.setData)
   }
 }

 goToHome = ()=>this.setState({ isTesterList : false, testerName : '', serverResponse : {}})
 
  render(){
    const {isTesterList , testerName, serverResponse} = this.state;
    return (
      <div className="App">
        <BrowserRouter>
            {isTesterList ? 
            <Redirect exact from="/" to={`/testersList/${testerName}`} /> :
            !testerName && <Redirect exact push to='/' />}
          <Switch>
            <Route 
                path="/" 
                render={() => (<SearchTester showTable={this.showTable}/>)}
                exact 
              />
            <Route 
                path="/testersList/:id"
                render={() => (isTesterList ? <TestersList goToHome={this.goToHome}  serverResponse={serverResponse} />: <SearchTester />)}
                exact 
              />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
