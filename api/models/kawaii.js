const mongoose = require('mongoose');

const { Schema } = mongoose;
const kawaiiSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId
        },
        position: {
            type: Schema.Types.String,
            enum: ['LEFT', 'RIGHT'],
            required: true
        },
        kawaiiList: {
            type: [Schema.Types.String]
        }
    }
);

module.exports = mongoose.model('Kawaii', kawaiiSchema);