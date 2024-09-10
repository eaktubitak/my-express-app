const request = require('supertest');
const app = require('../index'); // Ana uygulama dosyasını CommonJS ile import edin

describe('GET /', function() {
  it('should return Hello World!', async function() {
    // Supertest ile async/await kullanarak test yapma
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200);
    
    // Yanıtın içeriğini kontrol etme
    if (response.text !== 'Hello World!') {
      throw new Error(`Beklenen 'Hello World!' değeri yerine ${response.text} döndürüldü.`);
    }
  });
});
