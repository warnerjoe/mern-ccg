const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Card = require('./models/Card');

require('dotenv').config();

// Request logger - prints request info to console -- only for dev purposes
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

// Enable CORS for all routes
app.use(cors());

// Routes
// / - GET - RENDERS ALL CARDS TO EJS VIEW
app.get('/', (req, res) => {
    Card.find()
        .then(results => {
            res.render('index.ejs', { cards: results });
        })
        .catch(error => console.error(error));
});

// /api/cards - GET - RETURNS ALL CARDS AS JSON
app.get('/api/cards', (req, res) => {
    Card.find()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// /cards - POST - ADDS A NEW CARD
app.post('/cards', (req, res) => {
    const card = new Card(req.body);
    card.save()
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(error => console.error(error));
});

// /cards - PUT - UPDATES A CARD
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

// /cards - DELETE - DELETES A CARD
app.delete('/cards', (req, res) => {
    Card.deleteOne({ name: req.body.name })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No card to delete');
            }
            res.json(`Deleted ${req.body.name}'s card`);
        })
        .catch(error => console.error(error));
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_DB_URI, { dbName: 'raw-deal-app' })
    .then(() => {
        console.log('Connected to Database');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => console.error(error));
