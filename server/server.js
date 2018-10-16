const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const path = require('path'); // hosting

const app = express();
const serverPort = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { secure: true } // when hosted over https protocol
}))

app.use(express.static(`${__dirname}/../build`));

// endpts if needed

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(serverPort, () => {
  console.log(`Listening on: ${serverPort}`)
})
