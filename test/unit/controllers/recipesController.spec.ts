import { RecipesController } from '../../../src/controllers/recipesController';
import * as playersRepo from '../../../src/repositories/playersRepo';

function mockRes() { const r:any={}; r.status=jest.fn().mockReturnValue(r); r.json=jest.fn().mockReturnValue(r); return r; }

describe('recipesController', () => {
  it('listLearnableForPlayer 404 si no existe', () => {
    jest.spyOn(playersRepo.PlayersRepo, 'getById').mockReturnValue(undefined as any);
    const res = mockRes(); const next = jest.fn();
    RecipesController.listLearnableForPlayer({ params: { id: 'x' } } as any, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('list retorna recetas', () => {
    const res: any = { json: jest.fn() };
    RecipesController.list({} as any, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('listLearnable camino feliz', () => {
    jest.spyOn(playersRepo.PlayersRepo, 'getById').mockReturnValue({ id: 'x' } as any);
    const res: any = { json: jest.fn() };
    const next = jest.fn();
    RecipesController.listLearnableForPlayer({ params: { id: 'x' } } as any, res, next);
    expect(res.json).toHaveBeenCalled();
  });
});


