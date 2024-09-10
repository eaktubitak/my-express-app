const request = require('supertest');
const app = require('../index'); // Ana uygulama dosyasını CommonJS ile import edin

describe('GET /', () => {
  it('should return Hello World!', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200);

    expect(response.text).toBe('Hello World!');
  });
});
