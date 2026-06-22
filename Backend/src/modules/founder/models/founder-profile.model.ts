import mongoose, { Schema } from "mongoose";
import { IFounderProfileDocument } from "./interfaces/founder-profile.interface"; 

const founderProfileSchema = new Schema<IFounderProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    roleTitle: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      maxlength: 1000,
    },

    linkedinUrl: String,

    twitterUrl: String,

    website: String,

    experienceYears: {
      type: Number,
      min: 0,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    previousStartups: [
      {
        type: String,
        trim: true,
      },
    ],

    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const FounderProfile = mongoose.model<IFounderProfileDocument>(
  "FounderProfile",
  founderProfileSchema
);