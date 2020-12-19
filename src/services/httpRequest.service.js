import axios from 'axios';
// const URL  = "https://test-api.techsee.me/api/ex/";


export default function getTesters(testerName, callback){
  axios.get(`http://localhost:8000/getTesters/${testerName}`)
  .then(response => response.data ? callback({data :response.data}) : callback({error : 'No data found'}))
  .catch(e=>{
    callback({error : e});
  })
}

