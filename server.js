const express = require('express');
const router = require('./router/router')
const bodyParser=require('body-parser');
const app = express();
const PORT = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");

    next();
});

app.get('/', function (req, res) {
    res.send('Hello World')
}); 


app.use('/api', router)

app.listen(PORT,()=>{
    console.log(`Server listening on port: ${PORT}`);
});