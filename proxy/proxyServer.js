// Server setup
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios');
const URL  = "https://test-api.techsee.me/api/ex/";
const apiRouters = express.Router();
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use( (req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    res.header('Access-Control-Allow-Credentials', true);
    next()
  })

app.use(bodyParser.json())
const port = process.env.PORT || 8000

app.use('/', apiRouters);

apiRouters.get('/',function (req, res) {
    res.send("Proxy Server Is Alive")
})

apiRouters.get('/getTesters/:testerName', function (req, res) {
    const {testerName} = req.params;
    axios.get(`${URL}${testerName}`)
    .then(response => {
        res.send(response.data)
    })
    .catch(e=>{
        res.send(e);
    })
})

 

app.listen(port, function () {
    console.log(`Running on port ${port}`)
})