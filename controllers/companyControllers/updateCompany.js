import { Company } from "../../models/companyModel.js";
import { catchAsyncError } from "../../utils/catchAsyncErrorhandler.js";
import { ResponseHandler } from "../../utils/responseHandler.js";
import { ErrorHandler } from "../../utils/errorHandler.js";

export const updateCompany = catchAsyncError(async (req, res, next) => {
    const companyId = req.params.id
    const userId = req.user._id;
    const { companyName, companyDescription, companyAddress, companyPhone, companyEmail, companyWebsite } = req.body;
    if (!companyName && !companyDescription && !companyAddress && !companyPhone && !companyEmail) {
        return next(new ErrorHandler(400, 'At least one field is required'));
    }
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            return next(new ErrorHandler(404, "Company not found"));
        };
        if (company.companyCreatedBy.toString() !== userId.toString()) {
            return next(new ErrorHandler(400, "You are not authorized to update this company"));
        }
        if (companyName) company.companyName = companyName;
        if (companyDescription) company.companyDescription = companyDescription;
        if (companyAddress) company.companyAddress = companyAddress;
        if (companyPhone) company.companyPhone = companyPhone;
        if (companyEmail) company.companyEmail = companyEmail;
        if (companyWebsite) company.companyWebsite = companyWebsite;
        await company.save()
        return next(new ResponseHandler(201, "Data Fatched Successfully...", company))
    } catch (error) {
        return next(new ErrorHandler(500, error.message))
    }
})