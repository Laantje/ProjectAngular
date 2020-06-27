import {Preset} from './preset';
export class user {
  name: string;
  balance: number;
  points: number;
  preset: Preset;
  constructor(name, balance, points, preset) {
    this.name = name;
    this.balance = balance;
    this.points = points;
    this.preset = preset;
  }
}
