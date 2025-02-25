import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        unique: true,
        required: true
    },
    companyLogo: {
        type: String,
    },
    companyWebsite: {
        type: String
    },
    companyCreatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});


export const Company = mongoose.model( "Company",companySchema);
