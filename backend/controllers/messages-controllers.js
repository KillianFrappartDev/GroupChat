const fetchMessages = async (req, res, next) => {
  res.json({ message: 'fetchMessages' });
};

const sendMessage = async (req, res, next) => {
  res.json({ message: 'sendMessage' });
};

exports.fetchMessages = fetchMessages;
exports.sendMessage = sendMessage;
