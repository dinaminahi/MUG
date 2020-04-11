import mongoose from "mongoose";

export class Game {
  _id: mongoose.Types.ObjectId;
  name: string;
  categories: object[];
  description: string;
  playersMinAge: number;
  playersCount: {
    min: number;
    max: number;
  };
  playTimeMinutes: {
    min: number;
    max: number;
  };
  instructionUrl: string;
  photoUrl: string[];
}
