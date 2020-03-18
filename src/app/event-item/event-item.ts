export class EventItem {
  id: number;
  gameId: number;
  eventName: string;
  description: string;

  location: {
    /* location object structure to be defined */
  };
  dateTime: {
    /* the Date() object instance */
  };
  duration: string;
  players: {
    age: { min: number; max: number };
    count: { min: number; max: number; current: number };
    invitationList: [number, number, number]; // Manually invited users id's (optional),
    experienceNeeded: boolean;
  };
}
