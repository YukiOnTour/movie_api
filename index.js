const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(morgan('common'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let movies = [
    { title: "Inception", description: "A mind-bending thriller", genre: "Thriller", director: "Christopher Nolan", imageUrl: "url1", featured: true },
    { title: "The Matrix", description: "A sci-fi classic", genre: "Sci-Fi", director: "Lana Wachowski", imageUrl: "url2", featured: true },
];

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:title', (req, res) => {
    const movie = movies.find(m => m.title === req.params.title);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

app.get('/genres/:name', (req, res) => {
    // Mock genre data for demonstration
    if (req.params.name === 'Thriller') {
        res.json({ name: 'Thriller', description: 'A genre characterized by excitement and suspense' });
    } else {
        res.status(404).send('Genre not found');
    }
});

app.get('/directors/:name', (req, res) => {
    // Mock director data for demonstration
    if (req.params.name === 'Christopher Nolan') {
        res.json({ name: 'Christopher Nolan', bio: 'A British-American film director, producer, and screenwriter', birthYear: 1970, deathYear: null });
    } else {
        res.status(404).send('Director not found');
    }
});

app.post('/users', (req, res) => {
    res.json({ message: 'User registration successful' });
});

app.put('/users/:username', (req, res) => {
    res.json({ message: `User info updated for ${req.params.username}` });
});

app.post('/users/:username/movies/:movieID', (req, res) => {
    res.json({ message: `Movie ${req.params.movieID} added to ${req.params.username}'s favorites` });
});

app.delete('/users/:username/movies/:movieID', (req, res) => {
    res.json({ message: `Movie ${req.params.movieID} removed from ${req.params.username}'s favorites` });
});

app.delete('/users/:username', (req, res) => {
    res.json({ message: `User ${req.params.username} deregistered` });
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
