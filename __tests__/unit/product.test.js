const app = require('../../src/app.js');
const request = require('supertest');
const truncate = require('../utils/truncate.js');

describe('register product', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('should register a product', async () => {
    const product = {
      description: 'Embalagem 1',
      last_update: '20200127',
      quantity: 1000,
    };

    const response = await request(app).post('/product').send(product);

    expect(response.status).toBe(200);
  });

  it('should not register a new product with the same description', async () => {
    const product = {
      description: 'Embalagem 1',
      last_update: '20200126',
      quantity: 2000,
    };

    const response = await request(app).post('/product').send(product);

    expect(response.status).toBe(400);
  });

  it('should not throw error when register new product with unexpected variable', async () => {
    const product = {
      description: 'Embalagem 2',
      last_update: '20200130',
      quantity: 3000,
      anything: 'qualquer coisa',
    };

    const response = await request(app).post('/product').send(product);

    expect(response.status).toBe(200);
  });
});

describe('list product', () => {
  it('should list all products of database', async () => {
    const response = await request(app).get('/product');

    expect(response.body.length).toBe(2);
  });
});

describe('update product', () => {
  it('should update a product', async (done) => {
    try {
      const response = await request(app).get('/product');

      expect(response.status).toBe(200);

      let product = response.body[0];
      product.description = 'nova descricao';
      product.last_update = '20200101';

      expect(product.id).toBe(1);

      const resp = await request(app).post('/product').send(product);

      expect(resp.status).toBe(200);
      done();
    } catch (err) {
      done(err);
    }
  });

  it('should not update an unregistered product', async () => {
    const product = {
      id: -1,
      description: 'Embalagem -1',
      last_update: '20200130',
      quantity: 3000,
    };

    const response = await request(app).post('/product').send(product);

    expect(response.status).toBe(400);
  });
});
