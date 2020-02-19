describe('Connect Databases', () => {

    it('should connect in production database', async (done) => {
        expect.assertions(2)

        try{
            process.env.NODE_ENV='prod'
            const app = require('../../src/app.js')

            const connection = require('../../src/database/connection')
            const conn = await connection
            
            expect(conn).not.toBe(null)
            expect(conn.config.database).toBe("stock_manager")
        }catch(err){ }

        done()
    })

    it('should connect in dev database', async (done) => {
        expect.assertions(2)
        let conn = null

        try{
            process.env.NODE_ENV='dev'
            const app = require('../../src/app.js')

            const connection = require('../../src/database/connection')
            const conn = await connection            

            expect(conn).not.toBe(null)
            expect(conn.config.database).toBe("stock_manager_dev")
        }catch(err){ }

        done()
    })

    it('should connect in test database', async (done) => {
        expect.assertions(2)
        let conn = null

        try{
            process.env.NODE_ENV='test'
            const app = require('../../src/app.js')

            const connection = require('../../src/database/connection')
            const conn = await connection
            
            expect(conn).not.toBe(null)
            expect(conn.config.database).toBe("stock_manager_test")
        }catch(err){ }

        done()
    })
})