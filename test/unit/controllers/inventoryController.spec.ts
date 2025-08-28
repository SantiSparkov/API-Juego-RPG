import { InventoryController } from '../../../src/controllers/inventoryController';
import * as playersRepo from '../../../src/repositories/playersRepo';
import * as invUtils from '../../../src/utils/inventory';

function mockRes() { const r:any={}; r.status=jest.fn().mockReturnValue(r); r.json=jest.fn().mockReturnValue(r); r.send=jest.fn().mockReturnValue(r); return r; }

describe('inventoryController', () => {
  it('list 404 cuando no existe', () => {
    jest.spyOn(playersRepo.PlayersRepo, 'getById').mockReturnValue(undefined as any);
    const res = mockRes(); const next = jest.fn();
    InventoryController.list({ params: { id: 'x' } } as any, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('delete valida quantity', () => {
    jest.spyOn(playersRepo.PlayersRepo, 'getById').mockReturnValue({ id: 'x', inventory: [] } as any);
    const res = mockRes(); const next = jest.fn();
    InventoryController.deleteItem({ params: { id: 'x', itemId: 'oak_wood' }, body: { quantity: 0 } } as any, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('list ok y delete ok', () => {
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnValue({ send: jest.fn() }) };
    const next = jest.fn();
    const player: any = { id: 'x', inventory: [{ itemId: 'oak_wood', name: 'Madera', quantity: 2 }] };
    jest.spyOn(playersRepo.PlayersRepo, 'getById').mockReturnValue(player);
    InventoryController.list({ params: { id: 'x' } } as any, res, next);
    expect(res.json).toHaveBeenCalled();

    jest.spyOn(invUtils, 'removeFromInventory').mockReturnValue({ ok: true, inventory: [] } as any);
    jest.spyOn(playersRepo.PlayersRepo, 'update').mockReturnValue(player);
    InventoryController.deleteItem({ params: { id: 'x', itemId: 'oak_wood' }, body: { quantity: 1 } } as any, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});


