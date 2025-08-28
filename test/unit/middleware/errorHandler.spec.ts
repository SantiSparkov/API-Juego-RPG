import { errorHandler } from '../../../src/middleware/errorHandler';

describe('errorHandler', () => {
  it('usa status y message provistos', () => {
    const req: any = {};
    const json = jest.fn();
    const res: any = { status: jest.fn().mockReturnValue({ json }) };
    const next = jest.fn();
    errorHandler({ status: 400, message: 'bad' }, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ error: 'bad' });
  });

  it('usa 500 y mensaje por defecto si no hay status/message', () => {
    const req: any = {};
    const json = jest.fn();
    const res: any = { status: jest.fn().mockReturnValue({ json }) };
    const next = jest.fn();
    errorHandler({}, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
  });
});


