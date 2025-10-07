const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect( 'mongodb://localhost:27017' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('✅ MongoDB connected successfully!');
});

db.on('error', (err) => {
    console.log('❌ MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('🔌 MongoDB disconnected!');
});
