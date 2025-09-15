const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: [true, 'Enter first name']
        },
        lname: {
            type: String,
            required: [true, 'Enter last name']
        },
        date: {
            type: Date,
            required: [true, 'Enter date']
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;