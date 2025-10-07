const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    unique: true,
    required: true
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
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
  quantity: {
    type: Number,
    required: true
  },
  unit_price: Number,
  total_amount: {
    type: Number,
    required: true
  },
  delivery_address: {
    address: String,
    latitude: Number,
    longitude: Number,
    contact_number: String
  },
  order_status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending'
  },
  client_profit: {
    type: Number,
    default: 0
  },
  delivery_boy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  payment_method: {
    type: String,
    enum: ['cash', 'online', 'card'],
    default: 'cash'
  },
  payment_status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  ordered_at: {
    type: Date,
    default: Date.now
  },
  delivered_at: Date,
  customer_notes: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: String
});