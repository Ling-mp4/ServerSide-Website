var express = require('express');
var router = express.Router();
var Product = require('../models/productModel');

router.get('/', async (req, res) => {
  try {
    
    const products = await Product.find();

    products.forEach(product => {
      product.shortId = product._id.toString().slice(-10);
      product.createdAtFormatted = product.createdAt.toDateString();
      product.formattedDate = product.date.toDateString();
    });

    res.render('account', {title: 'Your Bookings', products: products});
    
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).send('Error getting data');
  }
});

router.get('/modify/:id', async (req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id);

  try {
    res.render('modify', {title: 'Modify training seesion', product}); 

  } catch (error) {
    console.error('Error modifying sessions', error);
    res.status(500).send("Error modifying sessions");
  }
});


router.post('/modify/:id', async (req, res) => {
  const {id} = req.params;
  const {fname, lname, date} = req.body;

  try {
    await Product.findByIdAndUpdate(id, {
        fname,
        lname,
        date
      });

    res.redirect('/account');

  } catch (error) {
    console.error('Error updating sessions', error);
    res.status(500).send("Error updating session");
  }
});

router.post('/delete/:id', async (req, res) => {
  const {id} = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.redirect('/account');

  } catch (error) {
    console.error('Error deleting sessions', error);
    res.status(500).send("Error deleting sessions");
  }
});

module.exports = router;