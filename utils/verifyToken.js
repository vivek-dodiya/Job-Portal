import jwt from "jsonwebtoken";

export const verifyToken = async (token, next) => {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        return next(new Error('Invalid token'))
    }
}