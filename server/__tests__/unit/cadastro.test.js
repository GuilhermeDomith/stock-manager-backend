const app = require('../../src/app.js')
const request = require('supertest')
const truncate = require('../utils/truncate.js')

describe('cadastro', () => {
    beforeAll(async () => {
        await truncate();
    })

    afterAll(async () => {
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

    it('should not register a product with the same description', async () => {
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

    it('should list all products of database', async () =>{
        const response = await request(app)
            .get('/produto')

        expect(response.body.length).toBe(1)
    }) 
})