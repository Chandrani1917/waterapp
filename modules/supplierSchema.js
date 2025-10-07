const supplierSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    companyName: {
    type: String,
    required: true
  },
  brands: [{
    name: String,
    description: String
  }],
  waterProducts: [{
    brand: String,
    type: {
      type: String,
      enum: ['mineral', 'filtered', 'spring', 'normal']
    },
     volume: Number, // লিটারে
    price: Number, // প্রতি ইউনিট মূল্য
    image: String,
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  business_documents: [{
    document_type: String, // 'nid', 'trade_license', etc
    document_url: String,
    verified: {
      type: Boolean,
      default: false
    }
  }],
  verification_status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  total_earnings: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
   clientCommission: {
    type: Number,
    default: 0
  },
  total_ratings: {
    type: Number,
    default: 0
  },
  service_areas: [String],
  bank_account: {
    account_holder: String,
    account_number: String,
    bank_name: String,
    branch_name: String
  }
});