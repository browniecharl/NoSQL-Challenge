// const { Schema, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// const ReactionSchema = new Schema (
//     {
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId()
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             validate: [({ length }) => length <= 280, 'Your reaction may not be more than 280 characters.']
//         },
//         username: {
//             type: String,
//             required: true
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: createdAt => dateFormat(createdAtVal)
//         }
//     }
// )

// module.exports = ReactionSchema;