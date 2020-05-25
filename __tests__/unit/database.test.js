const getConnection = require('../utils/get-connection.js');

describe('Connect Databases', () => {
  it('should connect in production database', async (done) => {
    expect.assertions(1);

    try {
      process.env.NODE_ENV = 'prod';
      require('../../src/config/dotenv.js');
      const conn = await getConnection();

      expect(conn.config.database).toBe('stock_manager');
    } catch (err) {
      console.log(err);
    }

    done();
  });

  it('should connect in dev database', async (done) => {
    expect.assertions(1);

    try {
      process.env.NODE_ENV = 'dev';
      const app = require('../../src/app.js');
      const conn = await getConnection();

      expect(conn.config.database).toBe('stock_manager_dev');
    } catch (err) {}

    done();
  });

  it('should connect in test database', async (done) => {
    expect.assertions(1);

    try {
      process.env.NODE_ENV = 'test';
      const app = require('../../src/app.js');
      const conn = await getConnection();

      expect(conn.config.database).toBe('stock_manager_test');
    } catch (err) {
      console.log(err);
    }

    done();
  });
});
