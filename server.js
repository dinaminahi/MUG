const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error' + err);
});


// API file for interacting with MongoDB
const api = require('./server/routes/api');
const users = require('./server/routes/users');

app.use(cors());

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/MUG-project')));

// API location
app.use('/api', api);
app.use('/users', users);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/MUG-project/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));