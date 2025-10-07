require('dotenv').config();
const express = require('express');
const passport = require('passport');

require('./config/db');
require('./middleware/passport-config');

const userRouters = require('./routes/userRoutes');


const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/user', userRouters);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
