import { InventoryItem } from '../models';

export function addToInventory(inventory: InventoryItem[], item: { itemId: string; name: string; quantity: number; rarity?: InventoryItem['rarity'] }): InventoryItem[] {
  const idx = inventory.findIndex(i => i.itemId === item.itemId);
  if (idx >= 0) {
    const copy = [...inventory];
    copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + item.quantity };
    return copy;
  }
  return [...inventory, { itemId: item.itemId, name: item.name, quantity: item.quantity, rarity: item.rarity }];
}

export function removeFromInventory(inventory: InventoryItem[], itemId: string, quantity: number): { inventory: InventoryItem[]; ok: boolean } {
  const idx = inventory.findIndex(i => i.itemId === itemId);
  if (idx < 0) return { inventory, ok: false };
  const item = inventory[idx];
  if (item.quantity < quantity) return { inventory, ok: false };
  const remaining = item.quantity - quantity;
  const copy = [...inventory];
  if (remaining === 0) copy.splice(idx, 1);
  else copy[idx] = { ...item, quantity: remaining };
  return { inventory: copy, ok: true };
}

export function hasMaterials(inventory: InventoryItem[], mats: { itemId: string; quantity: number }[]): boolean {
  return mats.every(m => (inventory.find(i => i.itemId === m.itemId)?.quantity ?? 0) >= m.quantity);
}


