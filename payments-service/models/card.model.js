   
const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    userid: String,
    cardid: String,
});

module.exports = mongoose.model('Card', CardSchema);