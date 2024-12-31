import { Schema, model } from "mongoose";
import Auth from "@/resources/auth/auth-interface";

const AuthSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default model<Auth>("Auth", AuthSchema);
