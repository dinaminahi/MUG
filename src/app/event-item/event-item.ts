export class EventItem {
  id: number;
  gameId: number;
  eventName: string;
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
