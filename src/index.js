const express = require('express');
const bodyParser = require('body-parser');

const { errorHandler, notFoundMiddleware, validateBookExistanse, validateReviewExistanse } = require('./middlewares');
const { books, generateId } = require('./mock-data');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/books', (req, res) => {
    res.send(books);
});

app.post('/books', (req, res) => {
    const newBook = { ...req.body, reviews: [], id: generateId() }

    books.push(newBook);

    res.status(201).send(newBook);
});

app.get('/books/:bookId', validateBookExistanse, (req, res) => {
    const { bookId } = req.params;

    const bookById = books.find(book => book.id === +bookId);

    res.send(bookById);
});

app.get('/books/:bookId/reviews', validateBookExistanse, (req, res) => {
    const { bookId } = req.params;

    const bookById = books.find(book => book.id === +bookId);

    res.send(bookById.reviews)
});

app.put('/books/:bookId', validateBookExistanse, (req, res) => {
    const { bookId } = req.params;

    const bookById = books.find(book => book.id === +bookId);

    bookById.title = req.body.title;

    res.send(bookById);
});

app.post('/books/:bookId/reviews', validateBookExistanse, (req, res) => {
    const { bookId } = req.params;

    const bookById = books.find(book => book.id === +bookId);

    const newReview = { ...req.body, id: generateId() }

    bookById.reviews.push(newReview);

    res.send(newReview);
});

app.delete('/books/:bookId/reviews/:reviewId', validateBookExistanse, validateReviewExistanse, (req, res) => {
    const { reviewId, bookId } = req.params;

    const bookById = books.find(book => book.id === +bookId);

    bookById.reviews = bookById.reviews.filter(review => review.id !== +reviewId);

    res.status(204).send();
});

app.use('*', notFoundMiddleware);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
