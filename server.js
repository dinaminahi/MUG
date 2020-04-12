const express = require('express');
const path = require('path');
const http = require('http');
const app = express();


const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

// ----------------------------

// Express APIs - new
const api = require('./routes/auth.routes');

// API file for interacting with MongoDB - old
const api = require('./server/routes/api');

// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
  },
  error => {
    console.log("Database can't be connected: " + error)
  }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);

// Express settings 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// Serve static resources
app.use('/public', express.static('public'));

// API location
app.use('/api', api);

// Define PORT
const port = process.env.PORT || '3000';
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

//------------------------------

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/MUG-project')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/MUG-project/index.html'));
});

//Set Port
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
