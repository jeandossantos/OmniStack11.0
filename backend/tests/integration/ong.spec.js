const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/db');


describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    
    afterAll( async () => {
        await connection.destroy();
    });

    it('should be able a to create a new ong', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAST3",
            email: "contato@apast.com",
            whatsapp: "2170707070",
            city: "Rio de Janeiro",
            uf: "RJ"
        })
        
        expect(response.text).toHaveLength(8);
        
    });
});