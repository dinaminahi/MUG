import mongoose from "mongoose";

export class EventItem {
  _id: mongoose.Types.ObjectId;
  eventName: string;
  agame: {
    id: number;
    name: string;
    category: string[];
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
    photoUrl: string;
  };
  description: string;
  location: {
    address: string;
    geo: {
      longitude: number;
      latitude: number;
    };
  };
  dateTime: string;
  dateFormated: string;
  duration: string;
  players: {
    age: { min: number; max: number };
    count: { min: number; max: number; current: number };
    invitationList: [number, number, number];
    experienceNeeded: boolean;
    joined: any[];
  };
}
