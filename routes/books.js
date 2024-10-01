const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { Router } = require("express");
const router = Router();

const db = require("../db/books.json");
const dbPath = path.join(__dirname, "..", "db", "books.json");
function storeDataToDb(db) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db));
    console.log("Stored to the db successfully !");
  } catch (err) {
    console.error("Error while storing to the db: ", err);
  }
}

router.get("/books", (req, res) => {
  res.send(db);
});

router.get("/books/:id", (req, res) => {
  const foundBook = db.find((book) => String(book.id) === String(req.params?.id));
  if(foundBook) {
    res.status(200).send(foundBook);
  }else {
    res.status(404).send({
      message: "Ma'lumot topilmadi !"
    })
  }
});

router.post("/books", (req, res) => {
  if (req.body.author && req.body.author) {
    const obj = {
      id: uuidv4(),
      title: req.body.title,
      author: req.body.author,
    };

    const isExist = db.find((book) => book.title === req.body.title);

    if (isExist) {
      res.status(400).send({
        error: true,
        message: "Berilgan title allaqachon mavjud !",
      });
    }

    db.push(obj);
    storeDataToDb(db);
    res.status(200).send({
      success: true,
      message: "Muvaffaqiyatli yaratildi !"
    });
  } else {
    res.status(400).send({
      error: true,
      message: "title va author majburiy !",
    });
  }
});

router.put("/books/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      error: true,
      message: "Iltimos idni yuboring !",
    });
  }

  if(!req.body.title || !req.body.author) {
    res.status(400).send({
      error: true,
      message: "title va author majburiy !",
    });
  }

  const foundBook = db.find((book) => String(book.id) === String(req.params.id));

  if(foundBook) {
    foundBook.title = req.body.title;
    foundBook.author = req.body.author;
    storeDataToDb(db);
    res.status(200).send({
      success: true,
      message: "Muvaffaqiyatli o'zgartirildi !"
    });
  }else {
    res.status(400).send({
      error: true,
      message: "Berilgan idga tegishli ma'lumot topilmadi !"
    })
  }

});


router.delete("/books/:id", (req,res) => {
  if (!req.params.id) {
    res.status(400).send({
      error: true,
      message: "Iltimos idni yuboring !",
    });
  }

  const foundBookIndex = db.findIndex((book) => String(book.id) === String(req.params.id));
 console.log("index: ", foundBookIndex);
  if(foundBookIndex !== -1) {
       db.splice(foundBookIndex, 1);
       storeDataToDb(db);
       res.status(200).send({
        success: true,
        message: "Muvaffaqiyatli o'chirildi !"
       });
  }else {
    res.status(400).send({
      error: true,
      message: "Ma'lumot topilmadi !"
    })
  }
 
});

module.exports = router;
