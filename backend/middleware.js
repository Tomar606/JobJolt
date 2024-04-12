const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.workerId = decoded.workerId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

const hauthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.workerId = decoded.workerId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

// Function to generate JWT token
const generateToken = (workerId) => {
    return jwt.sign({ workerId }, JWT_SECRET, { expiresIn: '1h' }); // Set expiration time as needed
};

// Example usage: Generate token for a worker with ID '123'
const token = generateToken('65fdcfd6a45aa53d40a7e33b');
console.log(token); // Output the generated token


module.exports = {
    authMiddleware,
    hauthMiddleware
}