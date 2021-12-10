const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true

    },
    director: {
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
    releaseYear: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }

    

});

module.exports = mongoose.model("Movie", movieSchema);