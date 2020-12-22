const login = async (req, res, next) => {
  res.json({ message: 'login' });
};

const signup = async (req, res, next) => {
  res.json({ message: 'signup' });
};

exports.login = login;
exports.signup = signup;
