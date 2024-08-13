const jwt = require('jsonwebtoken');
const JWT_SECRET = "adfrar23r2tgargd";


module.exports = function (req, res, next) {
    try {
        const token = req.header('xtoken');
        if (!token) {
            return res.status(400).send("Token not found");
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).send("Authentication error");
    }
};
