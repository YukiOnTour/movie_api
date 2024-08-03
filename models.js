const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Genre subdocument
const genreSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

// Define the schema for the Director subdocument
const directorSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  birthYear: { type: Number, required: true }
});

// Define the main Movie schema
const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: genreSchema, required: true },
  director: { type: directorSchema, required: true },
  imageURL: { type: String, required: true },
  featured: { type: Boolean, required: true }
});

// Define the User schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: Date, required: true },
  favoriteMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

// Create the Movie and User models
const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Movie, User };
