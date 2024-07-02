const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Card = require('./models/Card');

require('dotenv').config();

// Request logger - prints request info to console
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
    next();
};

app.set('view engine', 'ejs');
app.use(requestLogger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Unknown endpoint handler - from TUT1
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

// Routes
app.get('/', (req, res) => {
    Card.find()
        .then(results => {
            res.render('index.ejs', { cards: results });
        })
        .catch(error => console.error(error));
});

app.post('/cards', (req, res) => {
    const card = new Card(req.body);
    card.save()
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(error => console.error(error));
});

app.put('/cards', (req, res) => {
    Card.findOneAndUpdate(
        { name: 'test' },
        { $set: { name: req.body.name, quote: req.body.quote } },
        { upsert: true, new: true }
    )
    .then(result => {
        res.json('Success');
    })
    .catch(error => console.error(error));
});

app.delete('/cards', (req, res) => {
    Card.deleteOne({ name: req.body.name })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete');
            }
            res.json(`Deleted ${req.body.name}'s quote`);
        })
        .catch(error => console.error(error));
});

app.use(unknownEndpoint);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_DB_URI, { dbName: 'raw-deal-app'})
    .then(() => {
        console.log('Connected to Database');

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => console.error(error));