const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: String,
  originalUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Url', urlSchema);

