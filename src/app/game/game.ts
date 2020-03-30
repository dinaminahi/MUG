export class Game {
  id: number;
  name: string;
  category: object[];
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
