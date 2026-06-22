import mongoose, { Schema } from "mongoose";
import { IStartupDocument } from "./interfaces/startup.interface"; 

const startupSchema = new Schema<IStartupDocument>(
  {
    founderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
    },

    stage: {
      type: String,
      required: true,
    },

    website: String,

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    problem: {
      type: String,
      required: true,
      maxlength: 500,
    },

    solution: {
      type: String,
      required: true,
      maxlength: 500,
    },

    fundingAsk: {
      type: Number,
      required: true,
      min: 0,
    },

    equityOffered: {
      type: Number,
      min: 0,
      max: 100,
    },

    elevatorPitch: {
      type: String,
      required: true,
      maxlength: 500,
    },

    pitchDeckUrl: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Startup = mongoose.model<IStartupDocument>(
  "Startup",
  startupSchema
);