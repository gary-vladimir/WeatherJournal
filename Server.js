
const express = require('express');

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors())

const port = 5000;
app.use(express.static('.'))

const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })
