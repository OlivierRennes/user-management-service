const request = require('supertest');

const app = require('../src/app');

const User = require('../src/models/userModel');


describe('User Registration', () => {

    beforeAll(async () => {

        await User.deleteMany({});

    });


    it('should register a new user', async () => {

        const response = await request(app)

            .post('/api/users/register')

            .send({

                username: 'testuser',

                email: 'test@example.com',

                password: 'password123',

            });

        expect(response.status).toBe(201);

        expect(response.body.message).toBe('User registered successfully');

    });


    afterAll(async () => {

        await User.deleteMany({});

    });

});