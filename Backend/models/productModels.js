const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
        type: String,
        required: true,
         maxLength: [250, 'Product description cannot exceed 250 characters'],
    },
    price: {
        type: Number,
        required: true,
        default: 0.0,
    },
    images: [
        {
            filename:{
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [ true, 'Please select category for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
            ],
            message: 'Please select correct category for product',
        },
    },  
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [15, 'Product stock cannot exceed 15'],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        }
    ],
    seller:{
        type: String,
        required: [true, 'Please enter product seller'],
    },
    createdAt:{
         type: Date,
    default: Date.now,
    }
});


let schema =  mongoose.model('Product', productSchema);

module.exports = schema;