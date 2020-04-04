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
    subscribed: [];
    interested: [];
    created: [];
  };
  games: {
    favorited: []; // game id's or some part of game objects
    skillLevel: { novice: []; beginner: []; intermediate: []; advanced: [] };
  };
  rating: number; // likes counter form other users
}
