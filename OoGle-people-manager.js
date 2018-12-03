// The API toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object
const database = require('./programmers.json');

// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
const port = 3000;

// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}

let dbArray = [database];

// Build our routes

app.get('/', (req, res) => {
  res.send(dbArray);
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const person = dbArray.find(function(element) {
  	return element.firstName === id;
  });
  if (person === undefined) {
  	res.send(`Could not find slave: ${id}. GET / to see options`)
  }
  else {
  	  res.send(person);
  }
});

function copyInto(slave1, slave2) {
	slave1.firstName = slave2.firstName;
	slave1.lastName = slave2.lastName;
	slave1.homeAddress = slave2.homeAddress;
	slave1.SID = slave2.SID;
	slave1.goodSlave = slave2.goodSlave;
	slave1.beatingsToDate = slave2.beatingsToDate;
	slave1.family = slave2.family;
}

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const person = dbArray.find(function(element) {
  	return element.firstName === id;
  });
  copyInto(person, body);
  res.send(`Updated ${id} to:\n` + JSON.stringify(person));
});

app.post('/', (req, res) => {
  const body = req.body; // Hold your JSON in here!
  dbArray.push(body);
  res.send(`You sent: ${body}`);
});

app.post('/:id', (req, res) => {
	res.send('Invalid request');
});

app.put('/', (req, res) => {
	res.send('Invalid request');
});
app.put('/:id', (req, res) => {
	res.send('Invalid request');
});

app.listen(port, () => {
  console.log(`She's alive on port ${port}`);
});
