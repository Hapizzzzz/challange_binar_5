const app = require('../../app');
const request = require('supertest');
let createdUser = {};

describe('Integration Test: CRUD for Users', () => {
    test('Create a new user -> Success', async () => {
        try {
            const newUser = {
                name: 'New User',
                email: 'newuser@example.com',
                password: 'newpassword',
            };

            const { statusCode, body } = await request(app)
                .post('/api/v1/users')
                .send(newUser);

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Created');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.name).toBe(newUser.name);
            expect(body.data.email).toBe(newUser.email);
            expect(body.data.password).toBe(newUser.password);

            createdUser = body.data;
        } catch (err) {
            throw err;
        }
    });

    test('Read all users -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .get('/api/v1/users');

            expect(statusCode).toBe(200);
            expect(Array.isArray(body.data)).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    test('Read user by ID -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .get(`/api/v1/users/${createdUser.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'OK');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.id).toBe(createdUser.id);
        } catch (err) {
            throw err;
        }
    });

    test('Update user by ID -> Success', async () => {
        try {
            const updatedData = {
                name: 'Updated User',
                email: 'updateduser@example.com',
                password: 'updatedpassword',
            };

            const { statusCode, body } = await request(app)
                .put(`/api/v1/users/${createdUser.id}`)
                .send(updatedData);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'User updated successfully');
            expect(body).toHaveProperty('data');
            expect(body.data.name).toBe(updatedData.name);
            expect(body.data.email).toBe(updatedData.email);
            expect(body.data.password).toBe(updatedData.password);
        } catch (err) {
            throw err;
        }
    });

    test('Delete user by ID -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .delete(`/api/v1/users/${createdUser.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'User deleted successfully');
        } catch (err) {
            throw err;
        }
    });
});
