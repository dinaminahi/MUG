export class UserItem {
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
      }
    };
    dateOfBirth: string;
    description: string;
  };
  events: {
    subscribed: [];
    interested: [];
    created: [];
  };
  games: {
    favorited: []; // game id's or some part of game objects
    skillLevel:
    {
      novice: [];
      beginner: [];
      intermediate: [];
      advanced: [];
    };
    rating: Number; // likes counter form other users
  }
  }
  