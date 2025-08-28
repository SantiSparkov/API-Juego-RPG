export interface InventoryItem {
  itemId: string;
  name: string;
  quantity: number;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic';
}

export type Inventory = InventoryItem[];


