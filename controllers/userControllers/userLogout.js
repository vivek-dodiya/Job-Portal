import { catchAsyncError } from '../../utils/catchAsyncErrorhandler.js'
import { ResponseHandler } from '../../utils/responseHandler.js'
import { ErrorHandler } from '../../utils/errorHandler.js'

export const logout = catchAsyncError(async (req, res, next) => {
    try {
        res.clearCookie("token");
        return next(new ResponseHandler(201, "Loged Out SuccessFully"))
    } catch (error) {
        return next(new ErrorHandler(500, error.message))
    }
})