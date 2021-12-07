const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true

    },
    author: {
        first: {
            type: String,
            trim: true,
            required: true
        },
        last: {
            type: String,
            trim: true,
            required: true
        }


    },
    genre: {
        type: String


    },
    publishYear: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true

    }

});

module.exports = mongoose.model("Book", bookSchema);