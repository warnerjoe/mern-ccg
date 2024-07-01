const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define a schema
const cardSchema = new mongoose.Schema({
    name: String,
    quote: String,
});

module.exports = mongoose.model('Card', cardSchema);