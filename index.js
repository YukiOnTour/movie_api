const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('common'));
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data for top 10 movies
const topMovies = [
    { title: "Movie 1", year: 2001 },
    { title: "Movie 2", year: 2002 },
    { title: "Movie 3", year: 2003 },
    { title: "Movie 4", year: 2004 },
    { title: "Movie 5", year: 2005 },
    { title: "Movie 6", year: 2006 },
    { title: "Movie 7", year: 2007 },
    { title: "Movie 8", year: 2008 },
    { title: "Movie 9", year: 2009 },
    { title: "Movie 10", year: 2010 }
];

// GET route for /movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// GET route for /
app.get('/', (req, res) => {
    res.send('Welcome to my movie API!');
});

app.get('/error', (req, res) => {
    throw new Error('This is a forced error.');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


