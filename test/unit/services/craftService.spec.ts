import { craftItem } from '../../../src/services/craftService';
import { createPlayer } from '../../../src/services/playersService';
import { addToInventory } from '../../../src/utils/inventory';
import { PlayersRepo } from '../../../src/repositories/playersRepo';

describe('craftService', () => {
  it('falla con jugador inexistente', () => {
    expect(() => craftItem('nope', 'wood_sword')).toThrow();
  });

  it('falla con receta inexistente', () => {
    const p = createPlayer('Crafter');
    expect(() => craftItem(p.id, 'no-recipe')).toThrow();
  });

  it('falla por materiales insuficientes y luego craftea tras agregar', () => {
    const p = createPlayer('Smith');
    expect(() => craftItem(p.id, 'wood_sword')).toThrow();
    const withMats = { ...p, inventory: addToInventory(p.inventory, { itemId: 'oak_wood', name: 'Madera de Roble', quantity: 5 }) };
    PlayersRepo.update(p.id, withMats);
    const after = craftItem(p.id, 'wood_sword');
    const has = after.inventory.find(i => i.itemId === 'wood_sword');
    expect(!!has).toBe(true);
  });
});


