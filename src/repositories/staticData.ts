import { Location, Recipe } from '../models';

export const LOCATIONS: Location[] = [
  {
    id: 'forest',
    name: 'Bosque',
    skill: 'woodcutting',
    yields: [
      { itemId: 'oak_wood', name: 'Madera de Roble', minQuantity: 1, maxQuantity: 4, baseChance: 0.9, rarity: 'common' },
      { itemId: 'pine_wood', name: 'Madera de Pino', minQuantity: 1, maxQuantity: 3, baseChance: 0.7, rarity: 'common' },
      { itemId: 'maple_wood', name: 'Arce Raro', minQuantity: 1, maxQuantity: 2, baseChance: 0.15, rarity: 'rare' }
    ]
  },
  {
    id: 'mine',
    name: 'Mina',
    skill: 'mining',
    yields: [
      { itemId: 'iron_ore', name: 'Mineral de Hierro', minQuantity: 1, maxQuantity: 3, baseChance: 0.8, rarity: 'common' },
      { itemId: 'copper_ore', name: 'Mineral de Cobre', minQuantity: 1, maxQuantity: 3, baseChance: 0.75, rarity: 'common' },
      { itemId: 'rare_gem', name: 'Gemas Raras', minQuantity: 1, maxQuantity: 1, baseChance: 0.1, rarity: 'epic' }
    ]
  },
  {
    id: 'quarry',
    name: 'Cantera',
    skill: 'mining',
    yields: [
      { itemId: 'stone', name: 'Piedra', minQuantity: 2, maxQuantity: 5, baseChance: 0.9, rarity: 'common' },
      { itemId: 'marble', name: 'Mármol', minQuantity: 1, maxQuantity: 2, baseChance: 0.3, rarity: 'uncommon' },
      { itemId: 'crystal', name: 'Cristal', minQuantity: 1, maxQuantity: 1, baseChance: 0.1, rarity: 'rare' }
    ]
  }
];

export const RECIPES: Recipe[] = [
  {
    id: 'wood_sword',
    name: 'Espada de Madera',
    materials: [{ itemId: 'oak_wood', quantity: 5 }],
    result: { itemId: 'wood_sword', quantity: 1 },
    experienceGain: 10
  },
  {
    id: 'iron_helmet',
    name: 'Casco de Hierro',
    materials: [
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'stone', quantity: 1 }
    ],
    result: { itemId: 'iron_helmet', quantity: 1 },
    experienceGain: 20
  },
  {
    id: 'gem_ring',
    name: 'Anillo de Gema',
    materials: [
      { itemId: 'rare_gem', quantity: 1 },
      { itemId: 'copper_ore', quantity: 2 }
    ],
    result: { itemId: 'magic_ring', quantity: 1 },
    experienceGain: 40
  }
];


