import { User } from '../../models/userModel.js'
import { catchAsyncError } from '../../utils/catchAsyncErrorhandler.js'
import { ResponseHandler } from '../../utils/responseHandler.js'
import { ErrorHandler } from '../../utils/errorHandler.js'


export const profile = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        return next(new ResponseHandler(201, "Profile Fatched Successfully...", user))
    } catch (error) {
        return next(new ErrorHandler(500, error.message));
    }
})