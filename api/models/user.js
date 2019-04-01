const mongoose = require('mongoose');

const { ROLES } = require('../enums/user');

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    name: {
      type: Schema.Types.String
    },
    email: {
      type: Schema.Types.String,
      required: true
    },
    password: {
      type: Schema.Types.String,
      required: true
    },
  },
  { timestamps: false, _id: false }
);

const userSchema = new Schema(
  {
    role: {
      type: Schema.Types.String,
      enum: Object.values(ROLES),
      required: true
    },
    profile: profileSchema,
    refresh_token: {
      type: Schema.Types.String
    },
    last_login: {
      type: Schema.Types.Date,
      default: new Date()
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
