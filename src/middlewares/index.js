const { books } = require('../mock-data');

const notFoundMiddleware = (req, res) => {
    res.status(404).send('Route not Found')
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!');
};

const validateBookExistanse = (req, res, next) => {
    const { bookId } = req.params;

    const bookById = books.find(book => book.id === +bookId);

    if (!bookById) {
        res.status(404).send('Book Not Found');
        return;
    }

    req.existingBook = bookById;

    next();
}

const validateReviewExistanse = (req, res, next) => {
    const { reviewId } = req.params;

    const reviewById = req.existingBook.reviews.find(review => review.id === +reviewId);

    if (!reviewById) {
        res.status(404).send('Review Not Found');
        return;
    }

    next();
}

module.exports = {
    notFoundMiddleware,
    validateBookExistanse,
    validateReviewExistanse,
    errorHandler
}