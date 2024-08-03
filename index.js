const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Movie, User } = require('./models');

const app = express();

app.use(morgan('common'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieAPI', { useNewUrlParser: true, useUnifiedTopology: true });

// Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
    console.log('Fetching all movies');
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Return data about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    console.log(`Fetching movie with title: ${req.params.title}`);
    Movie.findOne({ title: req.params.title })
        .then(movie => res.json(movie))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/genres/:name', (req, res) => {
    console.log(`Fetching genre with name: ${req.params.name}`);
    Movie.findOne({ 'genre.name': req.params.name })
        .then(movie => {
            if (!movie) {
                return res.status(404).send('Genre not found');
            }
            res.json(movie.genre);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Return data about a director (bio, birth year) by name
app.get('/directors/:name', (req, res) => {
    console.log(`Fetching director with name: ${req.params.name}`);
    Movie.findOne({ 'director.name': req.params.name })
        .then(movie => {
            if (!movie) {
                return res.status(404).send('Director not found');
            }
            res.json(movie.director);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Return a list of ALL users
app.get('/users', (req, res) => {
    console.log('Fetching all users');
    User.find()
        .then(users => res.json(users))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Return data about a single user by username
app.get('/users/:username', (req, res) => {
    console.log(`Fetching user with username: ${req.params.username}`);
    User.findOne({ username: req.params.username })
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Allow new users to register
app.post('/users', (req, res) => {
    console.log('Registering new user');
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday
    })
    .then(user => res.status(201).json(user))
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Allow users to update their user info
app.put('/users/:username', (req, res) => {
    console.log(`Updating user with username: ${req.params.username}`);
    User.findOneAndUpdate({ username: req.params.username }, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
        }
    }, { new: true })
    .then(user => res.json(user))
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Allow users to add a movie to their list of favorites
app.post('/users/:username/movies/:movieID', (req, res) => {
    console.log(`Adding movie to favorites for user: ${req.params.username}`);
    User.findOneAndUpdate({ username: req.params.username }, {
        $push: { favoriteMovies: req.params.movieID }
    }, { new: true })
    .then(user => res.json(user))
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:username/movies/:movieID', (req, res) => {
    console.log(`Removing movie from favorites for user: ${req.params.username}`);
    User.findOneAndUpdate({ username: req.params.username }, {
        $pull: { favoriteMovies: req.params.movieID }
    }, { new: true })
    .then(user => res.json(user))
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Allow existing users to deregister
app.delete('/users/:username', (req, res) => {
    console.log(`Deleting user with username: ${req.params.username}`);
    User.findOneAndDelete({ username: req.params.username })
        .then(user => {
            if (!user) {
                return res.status(404).send(`${req.params.username} was not found.`);
            }
            res.status(200).send(`${req.params.username} was deleted.`);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
