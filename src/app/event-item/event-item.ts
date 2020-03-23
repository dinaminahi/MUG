export class EventItem {
  id: number;
  eventName: string;
  game: {
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
  location: any;
  dateTime: Date;
  duration: string;
  players: {
    age: { min: number; max: number };
    count: { min: number; max: number; current: number };
    invitationList: [number, number, number];
    experienceNeeded: boolean;
  };
}
