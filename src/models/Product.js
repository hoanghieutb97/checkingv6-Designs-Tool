const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  sortConfig: {
    primary: {
      type: String,
      enum: ['orderId', 'variant', 'sku', 'width', 'country', 'nameId'],
      default: 'orderId'
    },
    secondary: {
      type: String,
      enum: ['orderId', 'variant', 'sku', 'width', 'country', 'nameId'],
      default: 'variant'
    },
    tertiary: {
      type: String,
      enum: ['orderId', 'variant', 'sku', 'width', 'country', 'nameId'],
      default: 'sku'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  typeProduct: {
    type: String,
    default: 'spkhac'
  }
}, {
  timestamps: true,
  collection: 'checkingc6-constant'
});

module.exports = mongoose.model('Product', productSchema); 