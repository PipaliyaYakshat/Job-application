const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Company', companySchema);