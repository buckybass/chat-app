const mongoose = require('mongoose')

const schema = mongoose.Schema({
  message: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Chat',schema)
