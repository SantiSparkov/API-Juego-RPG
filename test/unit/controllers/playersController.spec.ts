import { PlayersController } from '../../../src/controllers/playersController';
import * as playersService from '../../../src/services/playersService';

function mockRes() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('playersController', () => {
  it('create valida name', () => {
    const req: any = { body: { name: '' } };
    const res = mockRes();
    const next = jest.fn();
    PlayersController.create(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('create ok', () => {
    const fake = { id: 'x', name: 'A' } as any;
    jest.spyOn(playersService, 'createPlayer').mockReturnValue(fake);
    const req: any = { body: { name: 'A' } };
    const res = mockRes();
    const next = jest.fn();
    PlayersController.create(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fake);
  });

  it('getById 404', () => {
    jest.spyOn(playersService, 'getPlayer').mockReturnValue(undefined);
    const req: any = { params: { id: 'nope' } };
    const res = mockRes();
    const next = jest.fn();
    PlayersController.getById(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('update validaciones', () => {
    const res = mockRes();
    const next = jest.fn();
    PlayersController.update({ body: { level: 0 }, params: { id: 'x' } } as any, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('update skills validaciones detalladas', () => {
    const res = mockRes();
    const next = jest.fn();
    PlayersController.update({ body: { skills: 'x' }, params: { id: 'x' } } as any, res, next);
    expect(next).toHaveBeenCalled();
    next.mockReset();
    PlayersController.update({ body: { skills: { mining: 0 } }, params: { id: 'x' } } as any, res, next);
    expect(next).toHaveBeenCalled();
    next.mockReset();
    PlayersController.update({ body: { skills: { woodcutting: 0 } }, params: { id: 'x' } } as any, res, next);
    expect(next).toHaveBeenCalled();
    next.mockReset();
    PlayersController.update({ body: { skills: { crafting: 0 } }, params: { id: 'x' } } as any, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('update 404 cuando no encuentra jugador', () => {
    jest.spyOn(playersService, 'updatePlayerStats').mockReturnValue(undefined as any);
    const res = mockRes();
    const next = jest.fn();
    PlayersController.update({ body: { level: 2 }, params: { id: 'x' } } as any, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('getById ok', () => {
    jest.spyOn(playersService, 'getPlayer').mockReturnValue({ id: 'a' } as any);
    const res = mockRes();
    PlayersController.getById({ params: { id: 'a' } } as any, res, jest.fn());
    expect(res.json).toHaveBeenCalled();
  });

  it('update camino feliz', () => {
    const updated: any = { id: 'x', level: 2 };
    jest.spyOn(playersService, 'updatePlayerStats').mockReturnValue(updated);
    const res = mockRes();
    PlayersController.update({ body: { level: 2 }, params: { id: 'x' } } as any, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith(updated);
  });
});


