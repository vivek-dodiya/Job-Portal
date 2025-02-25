import { Company } from "../../models/companyModel.js";
import { catchAsyncError } from "../../utils/catchAsyncErrorhandler.js";
import { ResponseHandler } from "../../utils/responseHandler.js";
import { ErrorHandler } from "../../utils/errorHandler.js";

export const getCompany = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;
    try {
        const companies = await Company.find({ companyCreatedBy: userId });
        if (!companies) {
            return next(new ErrorHandler(404, "Company not found"));
        }
        return next(new ResponseHandler(201, "Data Fatched Successfully...", companies))
    } catch (error) {
        return next(new ErrorHandler(500, error.message))
    }
})