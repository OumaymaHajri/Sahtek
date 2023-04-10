const mongoose = require('mongoose');
 

const post = new mongoose.Schema({
    description: String,
    time: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    commentsCount: Number,
    likesCount: Number,

    

 
})


module.exports = mongoose.model('Post',post);