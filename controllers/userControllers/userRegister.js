import { User } from '../../models/userModel.js'
import { catchAsyncError } from '../../utils/catchAsyncErrorhandler.js'
import { ResponseHandler } from '../../utils/responseHandler.js'
import { ErrorHandler } from '../../utils/errorHandler.js'


export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password, role } = req.body
    if (!name || !email || !password || !role) {
        return next(new ErrorHandler(400, 'Please fill in all fields'))
    }
    try {
        const userExist = await User.findOne( {email} );
        if (userExist) {
            return next(new ErrorHandler(400, 'User Already Registered By This Email'))
        }
        const user = await User.create({
            name,
            email,
            password,
            role
        });
        const token = await user.generateToken()
        res.cookie("token", token);
        return next(new ResponseHandler(201, "User Registered successfully", user))
    } catch (error) {
        return next(new ErrorHandler(500, error.message));
    }
})