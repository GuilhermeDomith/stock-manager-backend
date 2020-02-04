const app = require('../../src/app.js')
const request = require('supertest')
const truncate = require('../utils/truncate.js')

describe('register product', () => {
    beforeAll(async () => {
        await truncate();
    })

    it('should register a product', async () => {
        let produto = {
            descricao: 'Embalagem 1',
            data_update: '20200127',
            quantidade: 1000
        }

        const response = await request(app)
            .post('/produto')
            .send(produto)

        expect(response.status).toBe(200)
    })

    it('should not register a new product with the same description',
    async () => {
        let produto = {
            descricao: 'Embalagem 1',
            data_update: '20200126',
            quantidade: 2000
        }

        const response = await request(app)
            .post('/produto')
            .send(produto)

        expect(response.status).toBe(400)
    })

    it('should not throw error when register new product with unexpected variable', 
    async () => {
        let produto = {
            descricao: 'Embalagem 2',
            data_update: '20200130',
            quantidade: 3000,
            nova_variavel: "qualquer coisa"
        }

        const response = await request(app)
            .post('/produto')
            .send(produto)

        expect(response.status).toBe(200)
    })
})

describe('list product', () => {
    it('should list all products of database', async () => {
        const response = await request(app)
            .get('/produto')

        expect(response.body.length).toBe(2)
    })
})

describe('update product', () => {

    it('should update a product', async (done) => {
        try {
            const response = await request(app)
                .get('/produto')

            expect(response.status).toBe(200)

            let produto = response.body[0]
            produto.descricao = "nova descricao"
            produto.data_update = '20200101'

            expect(produto.id).toBe(1)

            const resp = await request(app)
                .post('/produto')
                .send(produto)

            expect(resp.status).toBe(200)
            done()
        } catch (err) {
            done(err)
        }
    })

    it('should not update an unregistered product', async () => {
        let produto = {
            id: -1,
            descricao: 'Embalagem -1',
            data_update: '20200130',
            quantidade: 3000
        }

        const response = await request(app)
            .post('/produto')
            .send(produto)

        expect(response.status).toBe(400)
    })
})