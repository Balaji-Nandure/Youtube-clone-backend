import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        subscriber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId, // user to whome subscriber is subscribing
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
