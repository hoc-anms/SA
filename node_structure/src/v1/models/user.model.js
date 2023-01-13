'use strict'

const {Schema, model} = require('mongoose');
const {studentDB} = require('../databases/init.multi.mongodb');

const userSchema = new Schema({
    username: String,
    password: String,
}, {collection: 'users', timestamps: true});

module.exports = {
    USER: studentDB.model('users', userSchema),
}