const request = require('supertest')
const db = require('../database/dbConfig.js')
const server = require('../api/server.js')

describe('POST api/auth/login' , ()=>{
    it('should return a 500', async () => {
        const res = await request(server).post('/api/auth/login/');
        expect(res.status).toBe(500);
        expect(res.type).toBe('application/json'); 
    });
}); 

describe('POST api/auth/register', () => {
    it('should return a 201', async () => {
        const user = { username: 'username', password: 'hashed password' }
        const res = await request(server).post('/api/auth/register/').send(user);
        expect(res.type).toBe('application/json');
    })
})