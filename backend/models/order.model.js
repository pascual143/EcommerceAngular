const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID del usuario que realizó el pedido
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true } 
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: String, required: true }, 
  orderDate: { type: Date, default: Date.now }, 
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' }, // Estado del pedido
  paymentMethod: { type: String }, 
  transactionId: { type: String }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;