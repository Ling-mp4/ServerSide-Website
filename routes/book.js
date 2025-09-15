var express = require('express');
var router = express.Router();
var Product = require('../models/productModel');

router.get('/', function(req, res) {
  res.render('book', {title:'Booking your training sesison!'});
});

router.post('/save', async (req, res) => {
  try {

    const product = await Product.create({
      fname: req.body.fname,
      lname: req.body.lname,
      date: req.body.date,
    });

    res.redirect('/book?success=true');

  } catch (error) {
    console.error('Error saving sessions', error);
    res.status(500).send("Error saving sessions");
  }
});

module.exports = router;