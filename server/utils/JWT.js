const jwt = require('jsonwebtoken');
const config = require('../config/keys');

class JwtManager {
    sign(payload, expiresIn = config.jwt.tokenLife) {
        try {
            const token = jwt.sign(payload, config.jwt.secret, { expiresIn });
            return token;
        } catch (error) {
            throw error;
        }
    }

    verify(token) {
        try {
            const decoded = jwt.verify(token, config.jwt.secret);
            return decoded;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = new JwtManager