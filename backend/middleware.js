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

        req.hirerId = decoded.hirerId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

const generateToken = (workerId) => {
    return jwt.sign({ workerId }, JWT_SECRET, { expiresIn: '1h' });
};

const token = generateToken('65fdcfd6a45aa53d40a7e33b');
console.log(token);


module.exports = {
    authMiddleware,
    hauthMiddleware
}