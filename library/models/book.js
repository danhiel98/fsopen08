const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  published: {
    type: Number,
  },
  genres: [
    { type: String }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)