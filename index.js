const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const usersRouters = require('./src/routers/users')
const filmsRouters = require('./src/routers/films')
const booksRouters = require('./src/routers/books')

// ADD ROUTERS TO APP
app.use('/users', usersRouters)
app.use('/films', filmsRouters)
app.use('/books', booksRouters)


/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
