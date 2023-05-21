const mongoose = require('mongoose');
const VoteSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [
            true,
            "Question is required"
        ],
        unique: [
            true,
            "Question already exists"
        ],
        minlength: [
            10,
            "Question must be at least 10 characters"
        ]
    },

    option1: {
        type: String,
        required: [
            true,
            "Option 1 is required"
        ]
    }, 
    vote1: {
        type: Number,
    }, 

    option2: {
        type: String,
        required: [
            true,
            "Option 2 is required"
        ]
    }, 
    vote2: {
        type: Number,
    },
    
    option3: {
        type: String,

    }, 
    vote3: {
        type: Number,
    },

    option4: {
        type: String,
    },
    vote4: {
        type: Number,
    }, 
}, { timestamps: true });
module.exports = mongoose.model('Vote', VoteSchema);
