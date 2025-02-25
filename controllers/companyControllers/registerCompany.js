import { Company } from "../../models/companyModel.js";
import { catchAsyncError } from "../../utils/catchAsyncErrorhandler.js";
import { ResponseHandler } from "../../utils/responseHandler.js";
import { ErrorHandler } from "../../utils/errorHandler.js";

export const companyRegister = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id
    const { companyName, companyDescription, companyAddress, companyPhone, companyEmail, companyWebsite } = req.body;
    if (!companyName || !companyDescription || !companyAddress || !companyPhone || !companyEmail) {
        return next(new ErrorHandler(400, 'Please fill in all fields'));
    }
    try {
        const companyExist = await Company.findOne({
            $or: [
                { companyName },
                { companyEmail },
                { companyPhone }
            ]
        });
        if (companyExist) {
            return next(new ErrorHandler(400, 'Company Already Exists'));
        }
        const company = await Company.create({
            companyName,
            companyDescription,
            companyAddress,
            companyPhone,
            companyEmail,
            companyWebsite,
            companyCreatedBy: userId
        });
        return next(new ResponseHandler(201, "Company Created Successfully...", company))
    } catch (error) {
        return next(new ErrorHandler(500, error.message))
    }
});