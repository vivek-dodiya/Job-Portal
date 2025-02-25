import { User } from "../models/userModel.js"
import { ErrorHandler } from "../utils/errorHandler.js";
import { catchAsyncError } from "../utils/catchAsyncErrorhandler.js";

export const onlyRecruiterAccess = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 'Recruiter') return next(new ErrorHandler(401, 'You are not authorized to access this resource'));
        next();
    } catch (error) {
        return next(new ErrorHandler(500, error.message));
    }
});