const mongoose = require('mongoose');

const { Schema } = mongoose;

const kawaiiSchema = new Schema(
  {
    userId: {
      type: Schema.Types.String,
      required: true
    },
    kawaiisInleft: [{
      type: Schema.Types.String
    }],
    kawaiisInRight: [{
      type: Schema.Types.String
    }]
  }
);

module.exports = mongoose.model('Kawaii', kawaiiSchema);
