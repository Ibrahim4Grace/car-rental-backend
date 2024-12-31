import { Document } from "mongoose";

export default interface Auth extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  deleted: boolean;
  comparePassword: (password: string) => boolean;
  generateToken: () => string;
  toJSON: () => any;
}
