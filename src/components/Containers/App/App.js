import './App.css';
import React from 'react';
import SearchTester from '../SearchTester/SearchTester';
import { BrowserRouter, Route, Switch , Redirect} from 'react-router-dom';
import TestersList from '../TestersList/TestersList';
import httpRequest from '../../../services/httpRequest.service';

class  App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isTesterListOn : false, testerName : '', serverResponse : {}};
 }

 setData = (data) =>{
  this.setState({isTesterListOn : true,serverResponse : data})
 }

 showTable =async (testerName) =>{
   if(!this.state.testerName){
    this.setState({testerName : testerName});
    const res = await httpRequest(testerName).catch(e=>{
      console.error(e)
      this.setState({error : e})
    })
    res.data ? this.setData({data : res.data}) : this.setData({error : 'No data found'})
   }
 }

 goToHome = ()=>this.setState({ isTesterListOn : false, testerName : '', serverResponse : {}})
 
  render(){
    const {isTesterListOn , testerName, serverResponse} = this.state;
    return (
      <div className="App">
        <BrowserRouter>
            {isTesterListOn ? 
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
                render={() => (isTesterListOn ? <TestersList goToHome={this.goToHome}  serverResponse={serverResponse} />: <SearchTester />)}
                exact 
              />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
