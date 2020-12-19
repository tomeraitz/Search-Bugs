import axios from 'axios';

export default async  function getTesters(testerName){
 return await axios.get(`http://localhost:8000/getTesters/${testerName}`);
}

