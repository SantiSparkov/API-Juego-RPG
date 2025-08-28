import { CraftController } from '../../../src/controllers/craftController';
import * as craftService from '../../../src/services/craftService';

function mockRes() { const r:any={}; r.status=jest.fn().mockReturnValue(r); r.json=jest.fn().mockReturnValue(r); return r; }

describe('craftController', () => {
  it('valida recipeId', () => {
    const req: any = { body: {}, params: { id: 'x' } };
    const res = mockRes();
    const next = jest.fn();
    CraftController.craft(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('camino feliz', () => {
    const player = { id: 'p', inventory: [] } as any;
    jest.spyOn(craftService, 'craftItem').mockReturnValue(player);
    const req: any = { body: { recipeId: 'wood_sword' }, params: { id: 'p' } };
    const res = mockRes();
    const next = jest.fn();
    CraftController.craft(req, res, next);
    expect(res.json).toHaveBeenCalledWith(player);
  });
});


