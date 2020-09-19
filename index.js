const express = require('express');
const routes = require('./routes/userApi');
const db = require('./db/database');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use (bodyParser.json ());

app.use(routes);


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });