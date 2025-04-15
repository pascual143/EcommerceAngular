const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: {type: String, required: true },
    price: {type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: {type: String},
    stock: {type: Number, required: true, default: 0 },
    createAt: {type: Date, default: Date.now },
    updateAt: {type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.export = Product;