const app = require('../../app');
const request = require('supertest');
let createdProfile = {};

describe('Integration Test: CRUD for Profiles', () => {
    test('Create a new profile -> Success', async () => {
        try {
            const newProfile = {
                user_id: 1, // Ganti dengan ID pengguna yang valid
                identity_type: 'Passport',
                identity_number: 'AB123456',
                address: '123 Main St',
            };

            const { statusCode, body } = await request(app)
                .post('/api/v1/profiles')
                .send(newProfile);

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Created');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('user_id');
            expect(body.data).toHaveProperty('identity_type');
            expect(body.data).toHaveProperty('identity_number');
            expect(body.data).toHaveProperty('address');
            expect(body.data.user_id).toBe(newProfile.user_id);
            expect(body.data.identity_type).toBe(newProfile.identity_type);
            expect(body.data.identity_number).toBe(newProfile.identity_number);
            expect(body.data.address).toBe(newProfile.address);

            createdProfile = body.data;
        } catch (err) {
            throw err;
        }
    });

    test('Read all profiles -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .get('/api/v1/profiles');

            expect(statusCode).toBe(200);
            expect(Array.isArray(body.data)).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    test('Read profile by ID -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .get(`/api/v1/profiles/${createdProfile.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'OK');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('user_id');
            expect(body.data).toHaveProperty('identity_type');
            expect(body.data).toHaveProperty('identity_number');
            expect(body.data).toHaveProperty('address');
            expect(body.data.id).toBe(createdProfile.id);
        } catch (err) {
            throw err;
        }
    });

    test('Update profile by ID -> Success', async () => {
        try {
            const updatedData = {
                identity_type: 'Driver License',
                identity_number: 'CD987654',
                address: '456 Oak St',
            };

            const { statusCode, body } = await request(app)
                .put(`/api/v1/profiles/${createdProfile.id}`)
                .send(updatedData);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Updated');
            expect(body).toHaveProperty('data');
            expect(body.data.identity_type).toBe(updatedData.identity_type);
            expect(body.data.identity_number).toBe(updatedData.identity_number);
            expect(body.data.address).toBe(updatedData.address);
        } catch (err) {
            throw err;
        }
    });

    test('Delete profile by ID -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .delete(`/api/v1/profiles/${createdProfile.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Deleted');
        } catch (err) {
            throw err;
        }
    });
});
