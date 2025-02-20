import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'Recruiter'],
        default: 'Student'
    },
    profile: {
        bio: {
            type: String
        },
        image: {
            type: String
        },
        resume: {
            type: String,
            default: ''
        },
        skills: [
            {
                type: String
            }
        ],
        resumeOrigenalname: {
            type: String

        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto: {
            type: String,
            default: ''
        }
    },
}, {
    timestamps: true
});

userSchema.pre("save",
    async function (next) {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
);

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE_IN
        }
    )
}


export const User = mongoose.model("User", userSchema)