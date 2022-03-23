const express = require("express");
const router = express.Router();
const data = require("../../data.js");

router.get("/", (req, res) => {
  res.json({ books: data.books });
});

router.delete("/:id", (req, res) => {
  let deletedBook;
  data.books = data.books.filter((book) => {
    if (book.id == req.params.id) {
      deletedBook = book;
      return false;
    } else {
      deletedBook = "Book not found!";
      return true;
    }
  });
  res.json({ book: deletedBook });
});

router.put("/:id", (req, res) => {
  const existingBook = data.books.find((book) => {
    return book.id == req.params.id;
  });
  existingBook.title = req.body.title;
  existingBook.type = req.body.type;
  existingBook.author = req.body.author;
  res.json({ book: existingBook });
});

router.get("/:id", (req, res) => {
  const book = data.books.find((book) => book.id == req.params.id);
  if (!book) {
    res.json("Book not found!");
  }
  res.json({ book: book });
});

router.post("/", (req, res) => {
  const book = {
    id: data.books.length + 1,
    title: req.body.title,
    type: req.body.type,
    author: req.body.author,
  };

  data.books.push(book);
  res.json({ book: book });
});

router.patch("/:id", (req, res) => {
  const existingBook = data.books.find((book) => {
    return book.id == req.params.id;
  });
  if (!existingBook) {
    res.status(404);
    res.json({ error: "book does not exist" });
    return;
  }
  if (req.body.title) {
    existingBook.title = req.body.title;
  }
  if (req.body.type) {
    existingBook.type = req.body.type;
  }
  if (req.body.author) {
    existingBook.author = req.body.author;
  }
  res.json({ book: existingBook });
});

module.exports = router;
