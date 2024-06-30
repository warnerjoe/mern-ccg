const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

require('dotenv').config()

// Request logger - prints request info to console
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
    next();
}

app.set('view engine', 'ejs')
app.use(requestLogger);

app.use(bodyParser.urlencoded({ extended: true }));

// Unknown endpoint handler - from TUT1
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

// Connect to MongoDB
MongoClient.connect(process.env.MONGO_DB_URI)
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('raw-deal-cards');
        const cardCollection = db.collection('maneuvers');

        // When localhost:3001/ is requested, respond with the index html.
        app.get('/', (req, res) => {
            db.collection('maneuvers')
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', { cards: results});
                })
                .catch(
                    error => console.error(error)
                );
        })

        app.post('/cards', (req, res) => {
            cardCollection.insertOne(req.body).then(result => {
                console.log(result);
                res.redirect('/');
            })
            .catch(error => console.error(error));
        })

        app.use(unknownEndpoint)

        // RUN THE SERVER ON PORT = 3001
        const PORT = 3000;

        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        })
    })
    .catch(error => console.error(error))