"use strict";

const Book = require("../models/book"),
  getBookParams = body => {
    return {
      title: body.title,
      author: {
        first: body.first,
        last: body.last
      },
      genre: body.genre,
      publishYear: body.publishYear,
      description: body.description
    };
  };

module.exports = {
  index: (req, res, next) => {
    Book.find()
      .then(books => {
        res.locals.books = books;
        next();
      })
      .catch(error => {
        console.log(`Error fetching books: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("books/index");
  },

  new: (req, res) => {
    res.render("books/new");
  },

  create: (req, res, next) => {
    let bookParams = getBookParams(req.body);
    Book.create(bookParams)
      .then(book => {
        res.locals.redirect = "/books";
        res.locals.book = book;
        next();
      })
      .catch(error => {
        console.log(`Error saving book: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let bookId = req.params.id;
    Book.findById(bookId)
      .then(book => {
        res.locals.book = book;
        next();
      })
      .catch(error => {
        console.log(`Error fetching book by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("books/show");
  },

  edit: (req, res, next) => {
    let bookId = req.params.id;
    Book.findById(bookId)
      .then(book => {
        res.render("books/edit", {
          book: book
        });
      })
      .catch(error => {
        console.log(`Error fetching book by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let bookId = req.params.id,
      bookParams = getBookParams(req.body);

    Book.findByIdAndUpdate(bookId, {
      $set: bookParams
    })
      .then(book => {
        res.locals.redirect = `/books/${bookId}`;
        res.locals.book = book;
        next();
      })
      .catch(error => {
        console.log(`Error updating book by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let bookId = req.params.id;
    Book.findByIdAndRemove(bookId)
      .then(() => {
        res.locals.redirect = "/books";
        next();
      })
      .catch(error => {
        console.log(`Error deleting book by ID: ${error.message}`);
        next();
      });
  }
};