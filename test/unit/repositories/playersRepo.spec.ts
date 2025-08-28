import { PlayersRepo } from '../../../src/repositories/playersRepo';

describe('PlayersRepo', () => {
  it('create/get/update funcionan', () => {
    const player = { id: 'p1', name: 'X', level: 1, experience: 0, skills: { mining:1, woodcutting:1, crafting:1 }, inventory: [], createdAt: new Date() } as any;
    PlayersRepo.create(player);
    const got = PlayersRepo.getById('p1');
    expect(got).toBeTruthy();
    const upd = PlayersRepo.update('p1', { level: 2 } as any);
    expect(upd!.level).toBe(2);
  });

  it('update de inexistente retorna undefined', () => {
    const res = PlayersRepo.update('missing', { level: 3 } as any);
    expect(res).toBeUndefined();
  });
});


