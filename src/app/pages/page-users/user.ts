export class User {
  id: number;
  personal: {
    photoUrl: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    location: { address: string; geo: { latitude: number; longitude: number } };
    dateOfBirth: number;
    description: string; //'Фанат кооперативних ігор; завжди беру на зустріч з собою пиво на всю компанію'
  };
  events: {
    subscribed: number[];
    interested: number[];
    created: number[];
  };
  games: {
    favorited: number[]; // game id's or some part of game objects
    skillLevel: {
      novice: number[];
      beginner: number[];
      intermediate: number[];
      advanced: number[];
    };
  };
  rating: number; // likes counter form other users
}
