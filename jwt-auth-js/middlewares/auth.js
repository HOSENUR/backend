const jwt = require("jwt");
const User = require("../models/user");
const errorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new errorResponse("Unauthorized", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new errorResponse("No User Found For This ID", 404));
        }
        req.user = user;
        return next();
    } catch (error) {
        return next(new errorResponse("Unauthorized", 401));
    }
};
