const mongoose = require('mongoose');
const { Schema } = mongoose;

const PersonSchema = new Schema({

  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Person', PersonSchema);