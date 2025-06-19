import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerUser = asyncHandler(async (req, res) => {
    // get data from request body
    // validation
    // check if user already exists
    // upload avatar to cloudinary
    // crete user object  - crete entry in db
    // remove password and refreshToken from response
    // check for user creatin
    // send response

    const { username, email, password, fullName } = req.body;
    if (!username || !email || !password || !fullName) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    console.log("existingUser", existingUser);

    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const avatarLocalPath = req.files.avatar[0]?.path;
    const coverImageLocalPath = req.files.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    console.log("avatar ---------------------> ", avatar);
    console.log("coverImage --------------------->", coverImage);

    if (!avatar) {
        throw new ApiError(400, "Failed to upload avatar");
    }

    const user = await User.create({
        username,
        email,
        password,
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    });

    console.log("user ---------------------> ", user);

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    console.log("createdUser ---------------------> ", createdUser);

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});
