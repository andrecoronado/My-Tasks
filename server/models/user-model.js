const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema(
    {
        name: String,
        email: String,
        password: {},
        date:{ type: Date, default: Date.now }
    }
)

module.exports = mongoose.model('user', user);