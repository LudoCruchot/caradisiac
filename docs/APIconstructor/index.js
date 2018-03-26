const elasticsearch = require('elasticsearch');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./endpoints.js'));

app.listen(9292, () => {
    console.log('Listening on port 9292');
})