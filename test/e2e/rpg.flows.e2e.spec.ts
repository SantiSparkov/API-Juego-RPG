import request from 'supertest';
import app from '../../src/index';

describe('RPG API e2e', () => {
  let playerId: string;

  it('crea jugador', async () => {
    const res = await request(app).post('/players').send({ name: 'Alice' });
    expect(res.status).toBe(201);
    playerId = res.body.id;
  });

  it('obtiene ubicaciones', async () => {
    const res = await request(app).get('/locations');
    expect(res.status).toBe(200);
  });

  it('recolecta recursos', async () => {
    const res = await request(app).post(`/players/${playerId}/gather`).send({ locationId: 'forest' });
    expect(res.status).toBe(200);
  });
});


