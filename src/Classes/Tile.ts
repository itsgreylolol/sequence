import { Player } from "../Enums/Player";

export class Tile {
  Id?: string;
  Card: string;
  Occupied?: boolean = false;
  OccupiedBy?: Player;
}
