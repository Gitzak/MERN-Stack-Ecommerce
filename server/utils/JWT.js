const jwt = require("jsonwebtoken");
const config = require("../config/keys");

class JwtManager {
    // sign(payload, expiresIn = config.jwt.tokenLife) {
    sign(payload, expiresIn = config.jwt.tokenLife) {
        // console.log(expiresIn);
        try {
            const token = jwt.sign(payload, config.jwt.secret, { expiresIn });
            // console.log(token);
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
            const errorMessage = error.message || "Invalid token";
            const statusCode = error.name === "JsonWebTokenError" ? 401 : 500;

            return {
                status: statusCode,
                error: errorMessage,
            };
        }
    }
}

module.exports = new JwtManager();
