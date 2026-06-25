import { Document, Types } from "mongoose";

export interface IStartupDocument extends Document {
  founderId: Types.ObjectId;

  name: string;

  industry: string;

  stage: string;

  website?: string;

  tags?: string[];

  problem: string;

  solution: string;

  fundingAsk: number;

  equityOffered?: number;

  elevatorPitch: string;

  pitchDeckUrl?: string;

  isActive: boolean;

  status: "active" | "unlisted"

  createdAt: Date;
  updatedAt: Date;
}