const request = require('supertest');
const createApp = require('./index');

describe('Express App', () => {
  const app = createApp();

  it('should respond with the current time when hitting /time', async () => {
    const response = await request(app)
      .get('/time')
      .set('Authorization', 'mysecrettoken');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('epoch');
  });

  it('should respond with 403 Forbidden when hitting /metrics without authorization header', async () => {
    const response = await request(app).get('/metrics');

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: 'Forbidden' });
  });
});
