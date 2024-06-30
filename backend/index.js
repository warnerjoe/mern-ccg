const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Request logger - prints request info to console
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
    next();
}

app.use(requestLogger);

app.use(bodyParser.urlencoded({ extended: true }));

// Unknown endpoint handler - from TUT1
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

// When localhost:3001/ is requested, respond with the index html.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// When localhost:3001/quotes is requested, respond with the log
app.post('/quotes', (req, res) => {
    console.log(req.body)
})

app.use(unknownEndpoint)

// RUN THE SERVER ON PORT = 3001
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})