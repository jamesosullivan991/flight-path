const request = require('supertest');
const app = require('./index');

describe('Flight Path API', () => {
    test('should return a sorted flight path for a valid input', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ flights: [['IND', 'EWR'], ['SFO', 'ATL'], ['GSO', 'IND'], ['ATL', 'GSO']] })
            .expect(200);
        
        expect(response.body.flightPath).toEqual(['SFO', 'ATL', 'GSO', 'IND', 'EWR']);
    });

    test('should return a sorted flight path for another valid input', async () => {
        const response = await request(app)
            .post('/calculate')
            .send({ flights: [['SFO', 'EWR']] })
            .expect(200);
        
        expect(response.body.flightPath).toEqual(['SFO', 'EWR']);
    });

    test('should return 400 for invalid input', async () => {
        await request(app)
            .post('/calculate')
            .send({ flights: 'invalid' })
            .expect(400);
        
        await request(app)
            .post('/calculate')
            .send({})
            .expect(400);
    });
});
