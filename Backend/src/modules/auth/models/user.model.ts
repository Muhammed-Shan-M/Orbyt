import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.types.js";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["founder", "investor", "admin"],
      required: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    profileImageUrl: {
      type: String,
    },

    location: {
      type: String,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },

    lastLoginAt: {
      type: Date,
    },

    profileCompleted: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);


export const User = mongoose.model<IUser>("User", userSchema);