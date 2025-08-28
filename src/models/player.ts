import { InventoryItem } from './inventory';

export interface PlayerSkills {
  mining: number;
  woodcutting: number;
  crafting: number;
}

export interface Player {
  id: string;
  name: string;
  level: number;
  experience: number;
  skills: PlayerSkills;
  inventory: InventoryItem[];
  createdAt: Date;
}


