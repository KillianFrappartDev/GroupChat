const login = async (req, res, next) => {
  const { checked, email, password } = req.body;

  // Find User with email

  // Decrypt password

  // Check if password is valid

  // If Checked is true, create token

  // Send response

  res.json({ message: 'login' });
};

const signup = async (req, res, next) => {
  res.json({ message: 'signup' });
};

exports.login = login;
exports.signup = signup;
