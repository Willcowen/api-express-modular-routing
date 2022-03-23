const express = require("express");
const router = express.Router();
const data = require("../../data.js");

router.get("/", (req, res) => {
  res.json({ films: data.films });
});

router.get("/:id", (req, res) => {
    const film = data.films.find((film) => film.id == req.params.id);
    if (!film) {
      res.json("film not found!");
    }
    res.json({ film: film });
  });

router.delete("/:id", (req, res) => {
  let deletedFilm;
  data.films = data.films.filter((film) => {
    if (film.id == req.params.id) {
      deletedFilm = film;
      return false;
    } else {
      deletedUser = "Film not found!";
      return true;
    }
  });
  res.json({ user: deletedFilm });
});

router.put("/:id", (req, res) => {
  const existingFilm = data.films.find((film) => {
    return film.id == req.params.id;
  });
  existingFilm.title = req.body.title;
  existingFilm.director = req.body.director;
  res.json({ film: existingFilm });
});

router.post("/", (req, res) => {
  const film = {
    id: data.users.length + 1,
    title: req.body.title,
    director: req.body.director,
  };
  data.users.push(film);
  res.json({ film: film });
});

router.patch("/:id", (req, res) => {
  const existingFilm = data.films.find((film) => {
    return film.id == req.params.id;
  });
  if (!existingFilm) {
    res.status(404);
    res.json({ error: "film does not exist" });
    return;
  }
  if (req.body.title) {
    existingFilm.title = req.body.title;
  }
  if (req.body.director) {
    existingFilm.director = req.body.director;
  }
  res.json({ film: existingFilm });
});

module.exports = router;
