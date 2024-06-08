const {Schema , model} = require('mongoose');

const document = new Schema({
    _id: String,
    data: Object
});

module.exports = model('Document', document);