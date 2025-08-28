import { createPlayer, getPlayer, updatePlayerStats } from '../../../src/services/playersService';
import { PlayersRepo } from '../../../src/repositories/playersRepo';

describe('playersService', () => {
  it('crea y obtiene jugador', () => {
    const p = createPlayer('Bob');
    const found = getPlayer(p.id);
    expect(found).toBeTruthy();
    expect(found!.name).toBe('Bob');
  });

  it('actualiza stats del jugador', () => {
    const p = createPlayer('Carol');
    const updated = updatePlayerStats(p.id, { level: 2, experience: 10, skills: { mining: 2 } });
    expect(updated).toBeTruthy();
    expect(updated!.level).toBe(2);
    expect(updated!.experience).toBe(10);
    expect(updated!.skills.mining).toBe(2);
  });

  it('retorna undefined si no existe', () => {
    const u = updatePlayerStats('non-existent', { level: 99 });
    expect(u).toBeUndefined();
  });
});


