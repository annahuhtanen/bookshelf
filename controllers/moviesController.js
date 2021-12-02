"use strict";

const Movie = require("../models/movie"),
  getMovieParams = body => {
    return {
      title: body.title,
      director: { 
        first: body.first,
        last: body.last
      },
      genre: body.genre,
      releaseYear: body.releaseYear,
      description: body.description
    };
  };

module.exports = {
  index: (req, res, next) => {
    Movie.find()
      .then(movies => {
        res.locals.movies = movies;
        next();
      })
      .catch(error => {
        console.log(`Error fetching movies: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("movies/index");
  },

  new: (req, res) => {
    res.render("movies/new");
  },

  create: (req, res, next) => {
    let movieParams = getMovieParams(req.body);
    Movie.create(movieParams)
      .then(movie => {
        res.locals.redirect = "/movies";
        res.locals.book = movie;
        next();
      })
      .catch(error => {
        console.log(`Error saving movie: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let movieId = req.params.id;
    Movie.findById(movieId)
      .then(movie => {
        res.locals.movie = movie;
        next();
      })
      .catch(error => {
        console.log(`Error fetching movie by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("movies/show");
  },

  edit: (req, res, next) => {
    let movieId = req.params.id;
    Movie.findById(movieId)
      .then(movie => {
        res.render("movies/edit", {
          movie: movie
        });
      })
      .catch(error => {
        console.log(`Error fetching movie by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let movieId = req.params.id,
      movieParams = getMovieParams(req.body);

    Movie.findByIdAndUpdate(movieId, {
      $set: movieParams
    })
      .then(movie => {
        res.locals.redirect = `/movies/${movieId}`;
        res.locals.movie = movie;
        next();
      })
      .catch(error => {
        console.log(`Error updating movie by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let movieId = req.params.id;
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.locals.redirect = "/movies";
        next();
      })
      .catch(error => {
        console.log(`Error deleting movie by ID: ${error.message}`);
        next();
      });
  }
};