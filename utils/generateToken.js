const jwt = require ('jsonwebtoken');
const dotenv = require ('dotenv');
dotenv.config();

// Generate JWT Token

const generateToken = async (user) => {
    try {
        const payload = {_id : user._id};
        const auth_Token = jwt.sign({...payload}, process.env.JWT_TOKEN_SECRET_KEY);

            return Promise.resolve ({auth_Token});

    } catch (error) {
        return Promise.reject (error)
       
    }
}


module.exports = generateToken 

