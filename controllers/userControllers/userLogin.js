import { User } from '../../models/userModel.js'
import { catchAsyncError } from '../../utils/catchAsyncErrorhandler.js'
import { ResponseHandler } from '../../utils/responseHandler.js'
import { ErrorHandler } from '../../utils/errorHandler.js'


export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return next(new ErrorHandler(400, 'Please provide all fields'))
    }
    try {
        const user = await User.findOne({
            $or: [
                { email },
                { role }
            ]
        });
        if (!user) {
            return next(new ErrorHandler(400, 'User Not Exist'))
        };
        const comparePass = await user.comparePassword(password);
        if (!comparePass) {
            return next(new ErrorHandler(400, 'Invalid Password'))
        }
        const token = await user.generateToken()
        res.cookie("token", token, {
            httpOnly: true
        });
        return next(new ResponseHandler(201, `${user.name} You Are Loggedin Successfully...`, token))
    } catch (error) {
        return next(new ErrorHandler(500, error.message))
    }
})