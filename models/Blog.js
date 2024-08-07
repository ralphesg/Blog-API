const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: [true, 'User ID is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', 
                required: [true, 'User ID is required']
            },
            username: {
                type: String,
                required: [true, 'Username is required']
            },
            comment: {
                type: String,
                required: [true, 'Comment text is required']
            },
            dateAdded: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('Blog', blogSchema);
