import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

export const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User registered successfully",
    });
});
