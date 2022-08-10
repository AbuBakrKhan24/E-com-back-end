const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        res.status(400).send(error)
    }
});


router.post("/add_product", (req, res) => {
    try {
      let sql = "INSERT INTO products SET ?";
      const {
        sku,
        name, 
        price,
        weight,
        descriptions,
        thumbnail,
        image,
        category,
        
        stock,
      } = req.body;
     let user = {
      
        sku,
        name, 
        price,
        weight,
        descriptions,
        thumbnail,
        image,
        category,
        
        stock,
      };
      con.query(sql, user, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(`Product ${(product.name)} was created successfully`);
      });
    } catch (error) {
      console.log(error);
    }
  });



  
  module.exports = router;

