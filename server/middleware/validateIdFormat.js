const mongoose = require('mongoose');

exports.validateIdFormat = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id format', status: 400 });
  }

  next();
};
