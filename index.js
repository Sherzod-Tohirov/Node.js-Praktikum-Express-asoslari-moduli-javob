const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3001;

const booksRoutes = require("./routes/books");
const mainRoutes = require("./routes/main");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(booksRoutes);
app.use(mainRoutes);


app.use((req, res, next) => {
  res.send("Not found!");
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
