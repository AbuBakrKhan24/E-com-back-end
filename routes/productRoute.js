const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");

// Get all users
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/add_product", (req, res) => {
  try {
    let sql = "INSERT INTO products SET ?";
    const {
      sku,
      name,
      price,
      anime_theme,
      descriptions,
      category,
      stock,
      product_catergory,
      image1,
      image2,
      image3,
    } = req.body;
    let create_date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let user = {
      sku,
      name,
      price,
      anime_theme,
      descriptions,
      category,
      create_date,
      stock,
      product_catergory,
      image1,
      image2,
      image3,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`Product ${user.name} was created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete one product
router.delete("/:id", (req, res) => {
  {
    con.query(
      `DELETE FROM products WHERE product_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send("Sucessfully deleted this product");
      }
    );
    // res.send({ id: req.params.id });
  }
});

module.exports = router;
