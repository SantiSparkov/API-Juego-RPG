export type SkillType = 'mining' | 'woodcutting';

export interface LocationResourceYield {
  itemId: string;
  name: string;
  minQuantity: number;
  maxQuantity: number;
  baseChance: number; // 0..1
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic';
}

export interface Location {
  id: string;
  name: string;
  skill: SkillType;
  yields: LocationResourceYield[];
}


