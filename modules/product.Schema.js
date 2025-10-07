const productSchema = new mongoose.Schema({
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  brand_name: {
    type: String,
    required: true
  },
  water_type: {
    type: String,
    enum: ['mineral', 'filtered', 'normal', 'spring'],
    required: true
  },
  volume_liters: {
    type: Number,
    required: true
  },
  price_per_unit: {
    type: Number,
    required: true
  },
  product_images: [String],
  available_quantity: {
    type: Number,
    default: 0
  },
  location: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  description: String,
  features: [String], // ['pure', 'healthy', 'tested'] etc
  is_available: {
    type: Boolean,
    default: true
  },
  added_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});