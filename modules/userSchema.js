const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 full_name: {
    type: String,
    required: true
  },
   phone_number: {
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  user_type: {
    type: String,
    enum: ['supplier', 'retailer', 'customer', 'delivery_boy'],
    default: 'user' ,
    required: true
  },
   
   location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('User', userSchema);
