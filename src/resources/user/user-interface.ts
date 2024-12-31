import { Document } from "mongoose";

export default interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;

    // Changed to async for password comparison
    comparePassword(password: string): Promise<boolean>;

    // Added return type for token
    generateToken(): string;

    // Improved typing for toJSON
    toJSON(): {
        _id: string;
        name: string;
        email: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    };
}
