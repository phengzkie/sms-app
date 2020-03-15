const mongoose = require('mongoose');

const Sender = mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('bet', Sender);
