export class Game {
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
}
