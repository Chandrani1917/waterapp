const retailerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
   businessName: String,
  serviceAreas: [{
    pincode: String,
    areaName: String
  }],
  suppliers: [{
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier'
      },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  service_areas: [String],
  profit_margin: {
    type: Number,
    default: 10
  },
  total_earnings: {
    type: Number,
    default: 0
  },
   clientCommission: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  total_orders: {
    type: Number,
    default: 0
  },
  bank_details: {
    account_holder: String,
    account_number: String,
    bank_name: String
  }
});