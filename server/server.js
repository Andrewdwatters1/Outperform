const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path'); // hosting

const stockCtrl = require('./stockCtrl');

const app = express();
const serverPort = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));


app.post('/api/submitTicker', stockCtrl.submitTicker);
app.post('/api/getSuggestions', stockCtrl.getSuggestions);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(serverPort, () => {
  console.log(`Listening on: ${serverPort}`)
})
