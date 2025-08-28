import { gatherResources } from '../../../src/services/gatherService';
import { PlayersRepo } from '../../../src/repositories/playersRepo';
import { createPlayer } from '../../../src/services/playersService';

describe('gatherService', () => {
  it('devuelve undefined si el jugador no existe', () => {
    const res = gatherResources('nope', 'forest');
    expect(res).toBeUndefined();
  });

  it('genera recursos válidos en inventario', () => {
    const p = createPlayer('Miner');
    const res = gatherResources(p.id, 'forest');
    expect(res).toBeTruthy();
    expect(Array.isArray(res!.inventory)).toBe(true);
  });
});


