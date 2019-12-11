'use strict';
let mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')


let UrlSchema = new mongoose.Schema({
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

UrlSchema.plugin(findOrCreate);

module.exports = mongoose.model('Url', UrlSchema);