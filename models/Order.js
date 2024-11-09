const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }],
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
    shippingAddress: String
});

module.exports = mongoose.model('Order', orderSchema);
