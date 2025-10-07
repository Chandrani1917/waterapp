const transactionSchema = new mongoose.Schema({
  transaction_id: {
    type: String,
    unique: true,
    required: true
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  retailer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retailer'
  },
  delivery_boy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount_breakdown: {
    total_amount: Number,
    client_commission: Number, // 10%
    supplier_amount: Number,
    retailer_amount: Number,
    delivery_charge: Number
  },
  transaction_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  payment_gateway_response: Object // Store payment gateway data
});