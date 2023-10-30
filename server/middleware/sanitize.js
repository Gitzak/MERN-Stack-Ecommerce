const xss = require('xss');

exports.sanitize = (req, res, next) => {
  // Sanitize the specified fields using xss
  const sanitizeFields = ['first_name', 'last_name', 'email', 'role', 'user_name', 'password'];
  for (const field of sanitizeFields) {
    if (req.body[field]) {
      req.body[field] = xss(req.body[field]);
    }
  }

  next(); 
}
