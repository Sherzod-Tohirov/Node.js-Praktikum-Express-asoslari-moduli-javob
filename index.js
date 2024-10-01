const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3001;
const db = require("./db/books.json");


const booksRoutes = require("./routes/books");
const mainRoutes = require("./routes/main");
app.use(express.static(path.join(__dirname, "public")));
app.use("books", booksRoutes);
app.use(mainRoutes);
app.use((req, res, next) => {
  res.sendFile("Not found!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
