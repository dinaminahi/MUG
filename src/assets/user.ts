export class User {
  id: number;
  personal: {
    photoUrl: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: number;
    email: any;
    location: { address: string; latitude: number; longitude: number };
    dateOfBirth: number;
    description: string; //'Фанат кооперативних ігор; завжди беру на зустріч з собою пиво на всю компанію'
  };
  events: {
    subscribed: [];
    interested: [];
  };
  games: {
    favorited: []; // game id's or some part of game objects
    experience: {
      novice: [];
      middle: [];
      advanced: [];
    };
  };
  rating: number; // likes counter form other users
}
