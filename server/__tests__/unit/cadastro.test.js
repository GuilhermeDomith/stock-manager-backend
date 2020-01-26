const app = await require('../../src/app')

describe('cadastro', () => {
    it('should return sum operation', async () => {
        var a = 6
        var b = 4

        var sum = a + b
        expect(sum).toBe(10)
    })
})