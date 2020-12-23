require('dotenv').config();

const jwt = require('jsonwebtoken');

const createToken = async id => {
  const token = await jwt.sign(
    {
      data: id
    },
    process.env.JWT_SECRET,
    { expiresIn: '72h' }
  );
  return token;
};

const checkToken = () => {};

exports.createToken = createToken;
exports.checkToken = checkToken;
