const createIdGenerator = () => {
    let count = 1;

    return () => {
        return count++;
    }
};

const generateId = createIdGenerator();

const books = [
    {
        id: generateId(),
        title: "Harry Potter and the Philosopher's Stone",
        reviews: [
            {
                id: generateId(),
                comment: "Nice"
            }
        ]
    },
    {
        id: generateId(),
        title: "Harry Potter and the Chamber of Secrets",
        reviews: [
            {
                id: generateId(),
                comment: "Not nice"
            }
        ]
    }
];

module.exports = {
    books,
    generateId,
}
