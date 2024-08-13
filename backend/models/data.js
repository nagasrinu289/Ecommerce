const mongoose = require('mongoose');
const data = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    wishlist:[{
        id: String,
        image: String,
        rating: {
            rate: Number,
            count: String
        },
        product: String,
        company: String,
        model: String,
        price: String,
        category: String,
        description: String,
    }],
    carts:[{
        id: String,
        image: String,
        rating: {
            rate: Number,
            count: String
        },
        product: String,
        company: String,
        model: String,
        price: String,
        category: String,
        description: String,
    }],
    orders:[{
        id: String,
        image: String,
        rating: {
            rate: Number,
            count: String
        },
        product: String,
        company: String,
        model: String,
        price: String,
        category: String,
        description: String,
        data:Date,
        Qty:String,
    }]
})

module.exports = mongoose.model("userData", data)