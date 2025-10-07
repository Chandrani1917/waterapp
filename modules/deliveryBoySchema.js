const deliveryBoySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  current_location: {
    address: String,
    latitude: Number,
    longitude: Number,
    updated_at: Date
  },
  assigned_orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  status: {
    type: String,
    enum: ['available', 'busy', 'offline'],
    default: 'offline'
  },
  total_deliveries: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  total_earnings: {
    type: Number,
    default: 0
  },
  vehicle_type: {
    type: String,
    enum: ['bike', 'cycle', 'van', 'car']
  },
  vehicle_number: String,
  documents: [{
    document_type: String,
    document_url: String,
    verified: Boolean
  }]
});