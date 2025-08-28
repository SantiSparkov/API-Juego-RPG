import { addToInventory, removeFromInventory, hasMaterials } from '../../../src/utils/inventory';

describe('inventory utils', () => {
  it('agrega y acumula items', () => {
    let inv = [] as any[];
    inv = addToInventory(inv, { itemId: 'oak_wood', name: 'Madera de Roble', quantity: 3 });
    inv = addToInventory(inv, { itemId: 'oak_wood', name: 'Madera de Roble', quantity: 2 });
    expect(inv.find(i => i.itemId === 'oak_wood')?.quantity).toBe(5);
  });

  it('elimina items y valida cantidades', () => {
    let inv = [] as any[];
    inv = addToInventory(inv, { itemId: 'iron_ore', name: 'Mineral de Hierro', quantity: 3 });
    const res1 = removeFromInventory(inv, 'iron_ore', 2);
    expect(res1.ok).toBe(true);
    expect(res1.inventory.find(i => i.itemId === 'iron_ore')?.quantity).toBe(1);
    const res2 = removeFromInventory(res1.inventory, 'iron_ore', 2);
    expect(res2.ok).toBe(false);
  });

  it('valida materiales suficientes', () => {
    let inv = [] as any[];
    inv = addToInventory(inv, { itemId: 'copper_ore', name: 'Mineral de Cobre', quantity: 2 });
    expect(hasMaterials(inv, [{ itemId: 'copper_ore', quantity: 2 }])).toBe(true);
    expect(hasMaterials(inv, [{ itemId: 'copper_ore', quantity: 3 }])).toBe(false);
  });
});


