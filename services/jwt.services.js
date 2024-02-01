import jwt from 'jsonwebtoken';

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
};

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

export { generateAccessToken, generateRefreshToken, verifyToken };