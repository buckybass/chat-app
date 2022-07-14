const mongoose = require('mongoose')

const schema = mongoose.Schema({
  message: {
    type: String,
    required: true
  }, recordedAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Chat', schema)
