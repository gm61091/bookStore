const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());  // adds middleware to parse JSON request bodies

let books = [];

app.get(`/books`, (request, response) => {
    response.json(books)
});

app.get(`/books/:id`, (request, response) => {
    const bookId = request.params.id;
    const book = books.find(book => book.id === parseInt(bookId));
    
    if(book > -1) {
        response.send('no books')
    }
    else {
        response.json(books)
    }
});

app.post(`/books`, (request, response) => {

    const { title, author } = request.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    }
    books.push(newBook)
    response.send(newBook)

});

app.put(`/books/:id`, (request, response) => {
    const bookId = request.params.id;
    const { title, author } = request.body;
    const bookIndex = books.findIndex(book => book.id === parseInt(bookId));
    if(bookIndex === -1) {
        response.send('no books found')
    }
    const updatedBook = { ...books[bookIndex], title, author};
    books[bookIndex] = updatedBook
    response.send(updatedBook)
});

app.delete(`/books/:id`, (request, response) => {
    const bookId = request.params.id;
    const bookIndex = books.findIndex(book => book.id === parseInt(bookId));
    if(bookIndex === -1) {
        response.send('no book found')
    }
    books.splice(bookIndex, 1)
    response.send('book deleted')
});




app.listen(PORT, () => {
    console.log(`servers running on port ${PORT}`);
})
