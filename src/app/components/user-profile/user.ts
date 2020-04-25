import mongoose from 'mongoose';

export class UserItem {
  _id: mongoose.Types.ObjectId;
  password: string;
  email: string;
  personal: {
    photoUrl: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    location: {
      address: string;
      geo: {
        longitude: Number;
        latitude: Number;
      };
    };
    dateOfBirth: string;
    description: string;
  };
  events: {
    subscribed: mongoose.Types.ObjectId[];
    interested: mongoose.Types.ObjectId[];
    created: mongoose.Types.ObjectId[];
  };
  games: {
    favorited: mongoose.Types.ObjectId[]; // game id's or some part of game objects
    skillLevel: {
      novice: [];
      beginner: [];
      intermediate: [];
      advanced: [];
    };
  };
  favoritedGames: [];
}
