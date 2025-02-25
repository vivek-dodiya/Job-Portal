import { User } from '../../models/userModel.js'
import { catchAsyncError } from '../../utils/catchAsyncErrorhandler.js'
import { ResponseHandler } from '../../utils/responseHandler.js'
import { ErrorHandler } from '../../utils/errorHandler.js'

export const update = catchAsyncError(async (req, res, next) => {
    const { name, email, bio, skills, } = req.body;
    const file = req.file
    if (!name && !email && !bio && !skills) {
        return next(new ErrorHandler(400, "Please Fill One Field"))
    };

    try {
        // Find User
        const user = await User.findById(req.user._id);
        if (!user) return next(new ErrorHandler(404, "User not exist"));

        // Creating Skill Array
        let skillsArray = user.profile.skills || [];
        if (skills) {
            const newSkill = skills.split(",").map(skill => {
                skill = skill.trim();
                return skill.charAt(0).toUpperCase() + skill.slice(1);
            }
            );
            skillsArray = [...new Set([...skillsArray, ...newSkill,])
            ];
        }

        // Updateing User
        if (name) user.name = name;
        if (email) user.email = email;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        // Save User
        await user.save();

        // Sanding Response
        return next(new ResponseHandler(201, "Profile Updated Succesfully...", user));

    } catch (error) {
        return next(new ErrorHandler(500, error.message));
    }
}) 