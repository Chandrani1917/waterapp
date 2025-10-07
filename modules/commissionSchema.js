const commissionSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  clientEarnings: {
    type: Number, // মোট অর্ডারের 5%
    required: true
  },
  supplierEarnings: {
    type: Number,
    required: true
  },
  retailerEarnings: {
    type: Number
  },
  orderedBy: {
    type: String,
    enum: ['retailer', 'supplier'],
    required: true
  },
  commissionCalculated: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });