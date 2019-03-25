const mongoose = require('mongoose');

const { Schema } = mongoose;
const columnSchema = new Schema (
    {
        position: {
            type: Schema.Types.String,
            enum: ['LEFT', 'RIGHT'],
            required: true
        },
        kawaiisList: {
            type: [Schema.Types.String]
        },
        userId: {
            type: Schema.Types.ObjectId
        }
    }
);

module.exports = mongoose.model('KawaiiColumn', columnSchema);