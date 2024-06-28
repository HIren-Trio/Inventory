const mongoose = require('mongoose');

module.exports= {
  products: [
    {
      quantity: {
        type: Number,
        required: true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
      }
    }
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  orderdate: {
    type: Date,
    default: () => Date.now() 
  },
  status:{
    type: String,
    default: 'pending',
    enum: ['pending', 'approved','rejected'],
    required: true
    
  }
}
