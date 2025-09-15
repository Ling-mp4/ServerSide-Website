var express = require('express');
var router = express.Router();
var Product = require('../models/productModel');

router.get('/', function (req, res) {
  res.render('report', {title: 'Create Report'});
});

router.post('/', function (req, res) {
  const { fname, lname, startDate, endDate } = req.body;
  res.redirect('/report/' + fname + '/' + lname + '?startDate=' + startDate + '&endDate=' + endDate);
});

router.get('/:fname/:lname', async function (req, res) {
  const {fname, lname} = req.params; 
  const {startDate, endDate} = req.query;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const products = await Product.find({
      fname,
      lname,
      date: { $gte: start, $lte: end }
    });

    products.forEach(product => {
      product.shortId = product._id.toString().slice(-10);
      product.createdAtFormatted = product.createdAt.toDateString();
      product.formattedDate = product.date.toDateString();
    });

    res.render('report-results', {
      title: 'Training Report for ' + fname + ' ' + lname,
      fname,
      lname,
      products,
    });

  } catch (error) {
    console.error('Error displaying sessions', error);
    res.status(500).send('Error displaying sessions');
  }
});

module.exports = router;
