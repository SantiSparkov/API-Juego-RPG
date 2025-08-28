import { GatherController } from '../../../src/controllers/gatherController';
import * as gatherService from '../../../src/services/gatherService';

function mockRes() { const r:any={}; r.status=jest.fn().mockReturnValue(r); r.json=jest.fn().mockReturnValue(r); return r; }

describe('gatherController', () => {
  it('valida locationId', () => {
    const req: any = { body: {}, params: { id: 'x' } };
    const res = mockRes();
    const next = jest.fn();
    GatherController.gather(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('404 si jugador no existe', () => {
    jest.spyOn(gatherService, 'gatherResources').mockReturnValue(undefined as any);
    const req: any = { body: { locationId: 'forest' }, params: { id: 'x' } };
    const res = mockRes();
    const next = jest.fn();
    GatherController.gather(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});


