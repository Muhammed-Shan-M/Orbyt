import { Document, Types } from "mongoose";

export interface IFounderProfileDocument extends Document {
  userId: Types.ObjectId;

  roleTitle?: string;

  bio?: string;

  linkedinUrl?: string;

  twitterUrl?: string;

  website?: string;

  experienceYears?: number;

  skills?: string[];

  previousStartups?: string[];

  achievements?: string[];

  createdAt: Date;
  updatedAt: Date;
}